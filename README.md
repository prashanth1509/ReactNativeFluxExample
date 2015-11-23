# ReactNativeFluxExample
Example app demonstrating flux architecture in react native.

Read about [flux](https://facebook.github.io/flux).

<img src="http://tylermcginnis.com/wp-content/uploads/2015/04/Flux-Diagram-1024x853.png" width="600" alt="http://tylermcginnis.com/wp-content/uploads/2015/04/Flux-Diagram-1024x853.png">

## Install 

```sh
git clone git@github.com:prashanth1509/ReactNativeFluxExample.git
cd ReactNativeFluxExample
npm install
```

* Double click ios/ReactNativeFluxExample.xcodeproj and opens in Xcode
* Select ReactNativeFluxExample and click Run on Xcode
* Incase you get an exception during build saying */bin/sh failed at react-native-xcode.sh*
  * Add ```source ~/.bash_profile``` before line 45 (where react-native .. is called) at node_modules/react-native/packager/react-native-xcode.sh
* You can press cmd+cnt+x to enable remote debugging.

## Dependencies
* "react-native": "^0.14.2",
* "react-native-phrontend": "git+ssh://git@github.com/Flipkart/react-native-phrontend.git#v1"

Read about [react-native-phrontend](https://github.com/Flipkart/react-native-phrontend).
