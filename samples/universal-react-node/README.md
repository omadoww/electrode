# Electrode Boilerplate Universal React Node
- This repo is a sample Electrode app with the following Electrode modules:
  - [Electrode Confippet](https://github.com/electrode-io/electrode-confippet)
  - [Electrode CSRF JWT](https://github.com/electrode-io/electrode-csrf-jwt)
  - [Electrode Javascript Bundle Viewer](https://github.com/electrode-io/electrify)
  - [Electrode Redux Router Engine](https://github.com/electrode-io/electrode-redux-router-engine)
  - [Electrode React SSR Caching](https://github.com/electrode-io/electrode-react-ssr-caching)
  - [Electrode Above the Fold Rendering](https://github.com/electrode-io/above-the-fold-only-server-render)

## Install

```bash
git clone https://github.com/electrode-io/electrode-boilerplate-universal-react-node.git
cd hapiApp
npm install
```

## Run
- Start the electrode app in `development` environment:

```bash
$ NODE_ENV=development gulp hot
```

- Start the electrode app in `production` environment:

```bash
$ NODE_ENV=production gulp hot
```

- Running in the selected environment should load the appropriate configuration settings

## Instructions
- You can build the app from scratch by following the instructions below:
  - [Electrode Confippet](#electrode-confippet)
  - [Electrode CSRF JWT](#csrf-jwt)
  - [Electrode Javascript Bundle Viewer](#bundle-viewer)
  - [Electrode Redux Router Engine](#redux-router-engine)

---
## <a name="electrode-confippet"></a>Electrode Confippet ##
- [Confippet](https://github.com/electrode-io/electrode-confippet) is a versatile utility for managing your NodeJS application configuration. Its goal is customization and extensibility, but offers a preset config out of the box.
- Scaffold an electrode app using the following commands:

### Install

```bash
npm install -g yo
npm install -g generator-electrode
yo electrode
```

#### Config
- Once the scaffolding is complete, open the following config files:

```
config
|_ default.json
|_ development.json
|_ production.json
```

#### Development environment
- Update the `config/development.json` to have the following settings:

```json
{
  "server": {
    "connections": {
      "compression": false
    },
    "debug": {
      "log": ["error"],
      "request": ["error"]
    }
  },
  "connections": {
    "default": {
      "port": 3000
    }
  }
}
```

- The above settings should show server log errors that may be beneficial for debugging, disable content encoding, and run the server in port 3000

#### Production environment
- Update the `config/production.json` to have the following settings:

```json
{
  "server": {
    "connections": {
      "compression": true
    },
    "debug": {
      "log": false,
      "request": false
    }
  },
  "connections": {
    "default": {
      "port": 8000
    }
  }
}
```

- The above settings should disable server log errors, enable content encoding, and run the server in port 8000
- The `server` key related configs are from hapi.js. More config options can be found here: http://hapijs.com/api
- The `connections` key are electrode server specific: https://github.com/electrode-io/electrode-server/tree/master/lib/config
- Keys that exist in the `config/default.json` that are also in the other environment configs will be replaced by the environment specific versions

#### Require
- In Electrode, the configurations are loaded from `server/index.js` at this line:

```javascript
const config = require("electrode-confippet").config;
const staticPathsDecor = require("electrode-static-paths");

require("electrode-server")(config, [staticPathsDecor()]);
```

#### Run
- Start the electrode app in `development` environment:

```bash
$ NODE_ENV=development gulp hot
```

- Start the electrode app in `production` environment:

```bash
$ NODE_ENV=production gulp hot
```

- Running in the selected environment should load the appropriate configuration settings

---
## <a name="csrf-jwt"></a>Electrode CSRF-JWT
[CSRF-JWT](https://github.com/electrode-io/electrode-csrf-jwt) is an Electrode plugin that allows you to authenticate HTTP requests using JWT in your Electrode applications.

### Install
- Add the `electrode-csrf-jwt` component:

```bash
npm install electrode-csrf-jwt --save
```

- Next, register the plugin with the Electrode server. Add the following configuration to the `plugins` section of `config/default.json`:

```json
"electrode-csrf-jwt": {
  "options": {
    "secret": "test",
    "expiresIn": 60
  }
}
```

That's it! CSRF protection will be automatically enabled for endpoints added to the app. CSRF JWT tokens will be returned in the headers and set as cookies for every response and must be provided as both a header and a cookie in every `POST` request.

> You can read more about options and usage details on [the component's README page](https://github.com/electrode-io/electrode-csrf-jwt#usage)

### CSRF-JWT Demonstration code

In addition to the above steps, the following modifications were made in order to demonstrate functionality:

* A plugin with two endpoints was added as `server/plugins/csrf.js` and registered via `config/default.json`
* AJAX testing logic was added to `client/components/csrf.jsx`

---
## <a name="bundle-viewer"></a>Electrode Javascript Bundle Viewer - How to use/integrate guide ##

Electrode Javascript bundle viewer is named [electrify](https://github.com/electrode-io/electrify), it is a tool that helps for analyzing the module tree of webpack based projects. It's especially handy for catching large and/or duplicate modules which might be either bloating up your bundle or slowing down the build/install process.

#### Integration points in your app ####
- use [electrode-archetype-react-app](https://github.com/electrode-io/electrode-archetype-react-app) which is already integrated with [electrify](https://github.com/electrode-io/electrify) and part of [electrode-boilerplate-universal-react-node](https://github.com/electrode-io/electrode-boilerplate-universal-react-node), all you have to do is run **gulp electrify** after installing [electrode-archetype-react-app](https://github.com/electrode-io/electrode-archetype-react-app) in your app.
- [electrify](https://github.com/electrode-io/electrify) dependency `sudo npm install -g electrode-electrify
` and npm task runner integration.
- [electrify](https://github.com/electrode-io/electrify) command line interface (CLI) `electrify <path-to-stats.json> --open`.

`electrode-boilerplate-universal-react-node` & [electrode-scaffolder](https://github.com/electrode-io/generator-electrode) internally use `electrode-archetype-react-app` hence `gulp electrify` on your terminal will start the bundle viewer in the browser.

When you install electrify globally using `sudo npm install -g electrode-electrify`, `electrify` command-line tool is made available as the quickest means of checking out your bundle. As of `electrode-electrify v1.0.0`, the tool takes any [webpack-stats](http://webpack.github.io/docs/node.js-api.html#stats-tojson) object as input and starts out a standalone HTML page as output in your browser, all you have to do is type `electrify <path to stats.json> --open` on your terminal.

Head over to the electrify [repository](https://github.com/electrode-io/electrify#electrify) for a detailed view of the bundle viewer and checkout the source-code. [electrify](https://github.com/electrode-io/electrify) relies on webpack to generate the application modules/dependency tree and is independent of whichever server framework(hapijs, expressjs, etc.) you choose to use.

## <a name="electrode-react-ssr-caching"></a>Electrode Server Side Rendering Component Caching ##

[electrode-react-ssr-caching](https://github.com/electrode-io/electrode-react-ssr-caching) module supports profiling React Server Side Rendering time and component caching to help you speed up SSR.

It supports 2 types of caching:

* Simple - Component Props become the cache key. This is useful for cases like Header and Footer where the number of variations of props data is minimal which will make sure the cache size stays small.
* Template - Components Props are first tokenized and then the generated template html is cached. The idea is akin to generating logic-less handlebars template from your React components and then use string replace to process the template with different props. This is useful for cases like displaying Product information in a Carousel where you have millions of products in the repository.

To demonstrate functionality,

* Added component `client/components/SSRCachingSimpleType.jsx` to demostrate Simple strategy.
* Added component `client/components/SSRCachingTemplateType.jsx` to demostrate Template strategy.
* To enable caching using `electrode-react-ssr-caching` we need to do the below configuration:

```
const cacheConfig = {
  components: {
    SSRCachingTemplateType: {
      strategy: "template",
      enable: true
    },
    SSRCachingSimpleType: {
      strategy: "simple",
      enable: true
    }
  }
};

SSRCaching.enableCaching();
SSRCaching.setCachingConfig(cacheConfig);
```

The above configuration is done in `server/index.js`.

To read more, go to [electrode-react-ssr-caching](https://github.com/electrode-io/electrode-react-ssr-caching)
---
## <a name="redux-router-engine"></a>Electrode Redux Router Engine ##
- [Redux Router Engine](https://github.com/electrode-io/electrode-redux-router-engine) handles async data for React Server Side Rendering using [react-router], Redux, and the [Redux Server Rendering] pattern.

### Install
```
npm install --save electrode-redux-router-engine
```
---
## <a name="above-the-fold"></a>Electrode Above the Fold Server Rendering
[Above the Fold Server Rendering](https://github.com/electrode-io/above-the-fold-only-server-render) is a React component for optionally skipping server side rendering of components outside above-the-fold (or outside of the viewport). This component helps render your components on the server that are above the fold and the remaining components on the client.

[Above-the-fold-only-server-render](https://github.com/electrode-io/above-the-fold-only-server-render) helps increase performance both by decreasing the load on renderToString and sending the end user a smaller amount of markup.

By default, the [above-the-fold-only-server-render](https://github.com/electrode-io/above-the-fold-only-server-render) component is an exercise in simplicity; it does nothing and only returns the child component.

### Install
- Add the `above-the-fold-only-server-render` component:

```bash
npm install above-the-fold-only-server-render --save
```

You can tell the component to skip server side rendering either by passing a `prop` `skip={true}` or by setting up `skipServerRender` in your app context and passing the component a `contextKey` `prop`.

You can skip server side rendering by passing a `skip prop`, like `<your-electrode-app>/components/above-fold-simple.jsx`. You can comment out the `<AboveTheFoldOnlyServerRender skip={true}>` (skip prop) and closing tag to see how the `above-the-fold-only-server-render` component is working underneath:

```js

const YourComponent = () => {
  return (
    //comment out '<AboveTheFoldOnlyServerRender skip={true}>' tags to toggle SSR of this component'
    <AboveTheFoldOnlyServerRender skip={true}>
      <div>This will not be server side rendered.</div>
    </AboveTheFoldOnlyServerRender>
  );
};

```

You can also skip server side rendering by `setting context in your app and passing a contextKey prop`. Here is an example:

```js

const YourComponent = () => {
    return (
      <AboveTheFoldOnlyServerRender contextKey="aboveTheFoldOnlyServerRender.SomeComponent">
        <div>This will not be server side rendered based on the context.</div>
      </AboveTheFoldOnlyServerRender>
    );
};

class YourApp extends React.Component {
  getChildContext() {
    return {
      aboveTheFoldOnlyServerRender: {
        YourComponent: true
      }
    };
  }

  render() {
    return (
      <YourComponent />
    );
  }
}

YourApp.childContextTypes = {
  aboveTheFoldOnlyServerRender: React.PropTypes.shape({
    AnotherComponent: React.PropTypes.bool
  })
};
```
On the Home page, click the link to render the `localhost:3000/above-the-fold` page.

The best way to demo this existing component is actually going to be in your `node_modules.`

Navigate to `<your-electrode-app>/node_modules/above-the-fold-only-server-render/lib/components/above-the-fold-only-server-render.js` line 29:

```javascript
var SHOW_TIMEOUT = 50;
```

When we use this module at [WalmartLabs](www.walmartlabs.com), it's all about optimization. You are going to change line 29 to slow down the SHOW_TIMEOUT so you can see the component wrapper in action:
Change this to:

```javascript
var SHOW_TIMEOUT = 3000;
```

Run the commands below and test it out in your app:

```bash
  gulp hot
```

The code in the <h3> tags that are above and below the <AboveTheFoldOnlyServerRender skip={true}> + </AboveTheFoldOnlyServerRender> will render first:

```javascript
import React from "react";
import {AboveTheFoldOnlyServerRender} from "above-the-fold-only-server-render";

export class AboveFold extends React.Component {

  render() {
    return (
      <div>
        <h3>Above-the-fold-only-server-render: Increase Your Performance</h3>
        <AboveTheFoldOnlyServerRender skip={true}>
            <div className="renderMessage" style={{color: "blue"}}>
              <p>This will skip server rendering if the 'AboveTheFoldOnlyServerRender'
                lines are present, or uncommented out.</p>
              <p>This will be rendered on the server and visible if the 'AboveTheFoldOnlyServerRender'
                lines are commented out.</p>
              <p>Try manually toggling this component to see it in action</p>
              <p>
                <a href="https://github.com/electrode-io/above-the-fold-only-server-render"
                  target="_blank">Read more about this module and see our live demo
                </a>
              </p>
            </div>
        </AboveTheFoldOnlyServerRender>
        <h3>This is below the 'Above the fold closing tag'</h3>
      </div>
    );
  }
}

```

To learn more about this essential stand alone module  visit the `above-the-fold-only-server-render` [Github repo](https://github.com/electrode-io/above-the-fold-only-server-render).
