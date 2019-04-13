# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.0.1](https://github.com/alexanderwende/injector/compare/v2.0.0...v2.0.1) (2019-04-13)


### Bug Fixes

* make injector tree-shakeable ([5e510af](https://github.com/alexanderwende/injector/commit/5e510af))



# [2.0.0](https://github.com/alexanderwende/injector/compare/v1.0.6...v2.0.0) (2019-04-09)


### Bug Fixes

* getPropertyAnnotation now allows PropertyKeys ([bb77c9e](https://github.com/alexanderwende/injector/commit/bb77c9e))
* inject dependencies for symbol property keys ([d3f0446](https://github.com/alexanderwende/injector/commit/d3f0446))


### Code Refactoring

* [@inject](https://github.com/inject) only accepts InjectTokens ([8bb000e](https://github.com/alexanderwende/injector/commit/8bb000e))
* InjectToken only has description ([72c5b33](https://github.com/alexanderwende/injector/commit/72c5b33))
* rename Injector's provide method to register ([b9bc19b](https://github.com/alexanderwende/injector/commit/b9bc19b))
* rename Provider.dependencies to parameters ([9b679bc](https://github.com/alexanderwende/injector/commit/9b679bc))


### Features

* add methods for updating dependency annotations
* new types for parameter annotation arrays and property annotation maps
* injector instance provides itself ([7799589](https://github.com/alexanderwende/injector/commit/7799589))
* **injector:** allow to set a default provider for an injector ([fbc15d1](https://github.com/alexanderwende/injector/commit/fbc15d1))
* **provider:** simplify defining provider dependencies ([ab2ef6b](https://github.com/alexanderwende/injector/commit/ab2ef6b))


### BREAKING CHANGES

* Injector's `provide` method is now called `register` for a clearer API
* Provider.dependencies is now Provider.parameters to be less ambiguous about dependency type
* BaseProvider.resolveDependencies is now BaseProvider.resolveParameters
* PropertyAnnotations and ParameterAnnotations are Maps now
* resolveDependencies, resolveProperties and createValue are now protected in BaseProvider
* @inject no longer supports constructors as arguments.
@inject should only be used to inject tokens or otherwise use the reflective type of the property or parameter which it decorates.
* InjectToken can no longer be instantiated with a class or symbol to make its usage less ambiguous
* removed PropertyAnnotation and ParameterAnnotation interfaces and replaced with DependencyAnnotation

* ANNOTATION constant no longer exported
* createParameterAnnotation no longer exists
* createPropertyAnnotation no longer exists



## [1.0.6](https://github.com/alexanderwende/injector/compare/v1.0.5...v1.0.6) (2019-03-12)


### Bug Fixes

* allow optional class dependencies ([70e7079](https://github.com/alexanderwende/injector/commit/70e7079))
* decouple injector from metadata implementation ([e54d817](https://github.com/alexanderwende/injector/commit/e54d817))



## 1.0.5 (2019-03-09)



## 1.0.4 (2019-03-08)



## 1.0.3 (2019-01-29)


### Features

* replace reflect-metadata dependency with smaller @abraham/reflect ([f3089df](https://github.com/alexanderwende/injector/commit/f3089df))



## 1.0.2 (2019-01-28)


### Bug Fixes

* **build:** delete lib directory in prebuild script ([db3f2d0](https://github.com/alexanderwende/injector/commit/db3f2d0))



## 1.0.1 (2019-01-28)



# 1.0.0 (2019-01-05)
