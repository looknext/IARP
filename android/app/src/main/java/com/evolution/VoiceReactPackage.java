package com.nativebasekitchensink;

import android.app.Application;
import com.tuanpm.RCTMqtt.*; // import

import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.xiaobu.amap.AMapLocationReactPackage;

import java.util.Arrays;
import java.util.List;

public class VoiceReactPackage extends ReactPackage{

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext){
      List<NativeModule> modules = new ArrayList<>();
      modules.add(new VoiceModule(reactContext));
      return modules;
    }

    @Override
    puhblic List<ViewManager> createViewManagers(ReactApplicationContext reactContext){
        return Collections.emptyList();
    }

}
