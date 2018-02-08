package com.looknext.ai2v;

import android.app.Application;

import com.looknext.ai2v.BuildConfig;

import com.facebook.react.ReactApplication;
import com.react.arron.speech.speechModulePackage;
import com.transistorsoft.rnbackgroundfetch.RNBackgroundFetchPackage;
import com.react.arron.speech.speechModulePackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.transistorsoft.rnbackgroundgeolocation.RNBackgroundGeolocation;
import com.transistorsoft.rnbackgroundfetch.RNBackgroundFetchPackage;


import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(

          new VoiceReactPackage(),
          new MainReactPackage(),
            new speechModulePackage(),
            new RNBackgroundFetchPackage(),
            new RNDeviceInfo(),
            new RNBackgroundGeolocation(),
            new speechModulePackage(),

          new VectorIconsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
