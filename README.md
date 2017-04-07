# API designer using local filesystem

This repository contains an implementation of the [api-designer](https://github.com/mulesoft/api-designer) using the local filesystem. As you might realize, I am only fetching the current `master` version as a dependency. 

There are two areas that I have changed to enable accessing the local filesystem:

1. provide an override for the default filesystem that is being used (browser cache) - find necessary code inside the `html` folder -
2. expose local filesystem as HTTP endpoint - find necessary code inside the `store` folder -  

This project is used to showcase how to enable the API designer to use the local filesystem. There might be problems so please be aware of that.

## Installation

It is not hosted on NPM and I am actually not planning to do it. Again, it's for demo purposes. If you still want to use it on your own, you can follow those simple steps:

1. Clone the repository
2. Execute `npm install`
3. Execute `npm link`
4. Execute `api-designer-fs examples/`