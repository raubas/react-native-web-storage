# react-native-web-storage
A synchronous local storage wrapper for both react-native(AsyncStorage) and browser(localStorage)

## Why?

#### Problem:
React-Native localStorage is asynchronous and Browser synchronous. Therefore, creating one app for both platforms which uses localStorage needs unified API.

#### Solution:
- For native platforms -> Abstract AsyncStorage and use inMemoryLocalStorage with sync API (the same as browser) and async it in background (always optimistic update)
- For browser -> Use browser LocalStorage with richer API as AsyncStorage

## Install

	npm install react-native-web-storage --save

## Usage

- How to hydrate redux store with data from localStorage
```javascript
import { HydrateStore } from '@aurity/react-native-web-storage'

// NOTE: import your redux store!
function App({ store }) {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}

export default HydrateStore(store)(App)
```

- How to work with storage

```javascript
import { storage } from '@aurity/react-native-web-storage'

storage.setItem(key, value)
storage.removeItem(key)
storage.getItem(key)
storage.store() // returns all storage
storage.clear() // clears all storage
storage.getAllFromLocalStorage() // reads data from platfrom specific localStorage
storage.setToken(value) // sets oAuth token
storage.getToken(value) // gets oAuth token
```

- How to handle storage and hydrate-store-wrapper in server env

Add this to you webpack config for server builds of your app when using SSR

```javascript
new webpack.NormalModuleReplacementPlugin(
	/\/storage\/storage$/,
	(resource) => {
		resource.request = resource.request.replace(/storage\/storage/, `storage/storage.mock`);
	}
),
new webpack.NormalModuleReplacementPlugin(
	/\/hydrate-store-wrapper$/,
	(resource) => {
		resource.request = resource.request.replace(/hydrate-store-wrapper/, `hydrate-store-wrapper.mock`);
	}
),
new webpack.NormalModuleReplacementPlugin(
	/\/hydrate-store-HOC$/,
	(resource) => {
		resource.request = resource.request.replace(/hydrate-store-HOC/, `hydrate-store-HOC.mock`);
	}
),
```


#### You are welcome to ask any question in the [issues](https://github.com/aurity/react-native-web-storage/issues) page.

#### TODO:
- [ ] add "key" support (web localStorage API)
- [ ] add "length" support (web localStorage API)
- [ ] add tests (cross-platform problems)
- [ ] add support for not optimistic update for AsyncStorage
- [ ] Fix hydrate-store-wrapper (i'm using the HOC)

### Changelog
#### 0.0.1
 - Storage support for AsyncStorage (react-native) and browser
 - HOC helper to hydrate redux store
