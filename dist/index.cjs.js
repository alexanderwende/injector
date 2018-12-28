'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const isConstructor = (constructorFn) => {
    return constructorFn instanceof Function && constructorFn.prototype && constructorFn.prototype.constructor === constructorFn;
};
const isSymbol = (symbol) => {
    return typeof symbol === 'symbol';
};

const DESIGN_TYPE = 'design:type';
const DESIGN_PARAMETER_TYPES = 'design:paramtypes';
const TOKEN = 'ioc:token';
const PARAMETERS = 'ioc:parameters';
const PROPERTIES = 'ioc:properties';

var metadataKeys = /*#__PURE__*/Object.freeze({
    DESIGN_TYPE: DESIGN_TYPE,
    DESIGN_PARAMETER_TYPES: DESIGN_PARAMETER_TYPES,
    TOKEN: TOKEN,
    PARAMETERS: PARAMETERS,
    PROPERTIES: PROPERTIES
});

const getTokenAnnotation = (target) => {
    return Reflect.getOwnMetadata(TOKEN, target);
};
const setTokenAnnotation = (target, token) => {
    Reflect.defineMetadata(TOKEN, token, target);
};
const getParameterAnnotation = (target, parameterIndex) => {
    ensureParameterAnnotations(target);
    return Reflect.getOwnMetadata(PARAMETERS, target)[parameterIndex];
};
const getParameterAnnotations = (target) => {
    ensureParameterAnnotations(target);
    return Reflect.getOwnMetadata(PARAMETERS, target);
};
const ensureParameterAnnotations = (target) => {
    if (!Reflect.hasOwnMetadata(PARAMETERS, target)) {
        const parameterTypes = Reflect.getOwnMetadata(DESIGN_PARAMETER_TYPES, target) || [];
        const parameterAnnotations = parameterTypes.map(type => createParameterAnnotation(type));
        Reflect.defineMetadata(PARAMETERS, parameterAnnotations, target);
    }
};
const getPropertyAnnotation = (target, propertyKey) => {
    ensurePropertyAnnotation(target, propertyKey);
    return Reflect.getOwnMetadata(PROPERTIES, target)[propertyKey];
};
const getPropertyAnnotations = (target) => {
    ensurePropertyAnnotations(target);
    return Reflect.getOwnMetadata(PROPERTIES, target);
};
const ensurePropertyAnnotations = (target) => {
    if (!Reflect.hasOwnMetadata(PROPERTIES, target)) {
        Reflect.defineMetadata(PROPERTIES, {}, target);
    }
};
const ensurePropertyAnnotation = (target, propertyKey) => {
    ensurePropertyAnnotations(target);
    const properties = Reflect.getOwnMetadata(PROPERTIES, target);
    if (!properties.hasOwnProperty(propertyKey)) {
        properties[propertyKey] = createPropertyAnnotation(Reflect.getOwnMetadata(DESIGN_TYPE, target.prototype, propertyKey));
    }
};
const createParameterAnnotation = (token, optional = false) => ({
    token: token,
    optional: optional
});
const createPropertyAnnotation = (token, optional = false) => ({
    token: token,
    optional: optional
});

class InjectToken {
    constructor(value) {
        if (isConstructor(value)) {
            this.value = Symbol.for(value.name);
            this.description = value.name;
        }
        else if (isSymbol(value)) {
            this.value = value;
            this.description = value.toString();
        }
        else {
            this.value = Symbol.for(value);
            this.description = value;
        }
    }
}

const inject = (constructorOrToken) => {
    return (target, propertyKey, parameterIndex) => {
        const isParameterDecorator = typeof parameterIndex === 'number';
        const token = (constructorOrToken instanceof InjectToken) ?
            constructorOrToken :
            (constructorOrToken instanceof Function) ?
                getTokenAnnotation(constructorOrToken) :
                (isParameterDecorator) ?
                    getParameterAnnotation(target, parameterIndex).token :
                    getPropertyAnnotation(target.constructor, propertyKey).token;
        if (isParameterDecorator) {
            // decorator is a parameter decorator
            const parameterAnnotation = getParameterAnnotation(target, parameterIndex);
            parameterAnnotation.token = token;
            // console.log('inject()... ', parameterAnnotation);
        }
        else {
            // decorator is a property decorator
            const propertyAnnotation = getPropertyAnnotation(target.constructor, propertyKey);
            propertyAnnotation.token = token;
            // console.log('inject()... ', propertyAnnotation);
        }
    };
};

const injectable = () => {
    return (target) => {
        const token = new InjectToken(target);
        setTokenAnnotation(target, token);
    };
};

const optional = () => {
    return (target, propertyKey, parameterIndex) => {
        if (typeof parameterIndex === 'number') {
            // decorator is a parameter decorator
            const parameterAnnotation = getParameterAnnotation(target, parameterIndex);
            parameterAnnotation.optional = true;
        }
        else {
            // decorator is a property decorator
            const propertyAnnotation = getPropertyAnnotation(target.constructor, propertyKey);
            propertyAnnotation.optional = true;
        }
    };
};

const createClassFactory = (constructorFn) => {
    return (...dependencies) => {
        // console.log(`ClassFactory<${constructorFn.name}>()... [dependencies]: `, dependencies);
        return new constructorFn(...dependencies);
    };
};

const createSingletonFactory = (constructorFn) => {
    let instance;
    return (...dependencies) => {
        if (!instance)
            instance = new constructorFn(...dependencies);
        return instance;
    };
};

const createValueFactory = (value) => {
    return () => value;
};

const PROVIDER_UNREGISTERED = new Error('Provider is not registered with an injector.');
class BaseProvider {
    constructor(factory, dependencies = [], properties = {}) {
        this.factory = factory;
        this.dependencies = dependencies;
        this.properties = properties;
    }
    provide(injector) {
        if (!injector)
            injector = this.injector;
        if (!injector)
            throw PROVIDER_UNREGISTERED;
        // console.group('Provider.provide()');
        // console.log('provider: ', this);
        // console.log('resolving dependencies: ', this.dependencies);
        const dependencies = this._resolveDependencies(injector);
        // console.log('resolved dependencies: ', dependencies);
        // console.log('resolving properties: ', this.properties);
        const properties = this._resolveProperties(injector);
        // console.log('resolved properties: ', properties);
        // console.groupEnd();
        return this._createValue(dependencies, properties);
    }
    _createValue(dependencies, properties) {
        const value = this.factory(...dependencies);
        return (value instanceof Object) ? Object.assign(value, properties) : value;
    }
    _resolveDependencies(injector) {
        return this.dependencies.map(dependency => injector.resolve(dependency.token, dependency.optional));
    }
    _resolveProperties(injector) {
        return Object.entries(this.properties).reduce((result, [key, value]) => {
            result[key] = injector.resolve(value.token, value.optional);
            return result;
        }, {});
    }
}

class ClassProvider extends BaseProvider {
    constructor(constructorFn, dependencies, properties) {
        super(createClassFactory(constructorFn), dependencies || getParameterAnnotations(constructorFn), properties || getPropertyAnnotations(constructorFn));
    }
}

class SingletonProvider extends ClassProvider {
    provide() {
        if (!this._instance)
            this._instance = super.provide();
        return this._instance;
    }
}

class ValueProvider extends BaseProvider {
    constructor(value) {
        super(createValueFactory(value));
    }
}

const CLASS_NOT_INJECTABLE = (constructorFn) => new Error(`Class '${constructorFn.name}' has not been decorated as injectable and cannot be resolved.`);
const NO_PROVIDER = (token) => new Error(`No provider has been found for the requested token '${token.description}'.`);
class Injector {
    constructor(parent) {
        this._registry = new Map();
        this._parent = null;
        if (parent)
            this._parent = parent;
    }
    provide(constructorOrToken, provider) {
        const token = constructorOrToken instanceof InjectToken ?
            constructorOrToken :
            getTokenAnnotation(constructorOrToken);
        // class was not decorated with @injectable, throw
        if (!token)
            throw CLASS_NOT_INJECTABLE(constructorOrToken);
        provider.injector = this;
        this._registry.set(token, provider);
    }
    resolve(target, optional = false) {
        let resolved;
        // console.group('Injector.resolve()');
        if (target instanceof InjectToken) {
            // console.log('resolving: ', target.value);
            resolved = this._resolveToken(target, optional);
        }
        else {
            // console.log('resolving: ', target.name);
            resolved = this._resolveConstructor(target, optional);
        }
        // console.groupEnd();
        return resolved;
    }
    _resolveConstructor(constructorFn, optional = false) {
        const token = getTokenAnnotation(constructorFn);
        // class was not decorated with @injectable, throw
        if (!token)
            throw CLASS_NOT_INJECTABLE(constructorFn);
        // class has no provider yet, we create one
        if (!this._getProvider(token)) {
            this.provide(token, new ClassProvider(constructorFn));
        }
        return this._resolveToken(token, optional);
    }
    _resolveToken(token, optional = false) {
        const provider = this._getProvider(token);
        if (!provider) {
            if (!optional)
                throw NO_PROVIDER(token);
            return undefined;
        }
        return provider.provide(this);
    }
    _getProvider(token) {
        if (this._registry.has(token)) {
            return this._registry.get(token);
        }
        else if (this._parent) {
            return this._parent._getProvider(token);
        }
    }
}

exports.isSymbol = isSymbol;
exports.isConstructor = isConstructor;
exports.ANNOTATION = metadataKeys;
exports.getTokenAnnotation = getTokenAnnotation;
exports.setTokenAnnotation = setTokenAnnotation;
exports.getParameterAnnotation = getParameterAnnotation;
exports.getParameterAnnotations = getParameterAnnotations;
exports.ensureParameterAnnotations = ensureParameterAnnotations;
exports.getPropertyAnnotation = getPropertyAnnotation;
exports.getPropertyAnnotations = getPropertyAnnotations;
exports.ensurePropertyAnnotations = ensurePropertyAnnotations;
exports.ensurePropertyAnnotation = ensurePropertyAnnotation;
exports.createParameterAnnotation = createParameterAnnotation;
exports.createPropertyAnnotation = createPropertyAnnotation;
exports.inject = inject;
exports.injectable = injectable;
exports.optional = optional;
exports.createClassFactory = createClassFactory;
exports.createSingletonFactory = createSingletonFactory;
exports.createValueFactory = createValueFactory;
exports.PROVIDER_UNREGISTERED = PROVIDER_UNREGISTERED;
exports.BaseProvider = BaseProvider;
exports.ClassProvider = ClassProvider;
exports.SingletonProvider = SingletonProvider;
exports.ValueProvider = ValueProvider;
exports.InjectToken = InjectToken;
exports.CLASS_NOT_INJECTABLE = CLASS_NOT_INJECTABLE;
exports.NO_PROVIDER = NO_PROVIDER;
exports.Injector = Injector;
//# sourceMappingURL=index.cjs.js.map
