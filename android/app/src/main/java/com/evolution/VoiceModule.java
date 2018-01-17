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

public class VoiceModule extends ReactContextBaseJavaModule{
    private VoiceUtils utils;
    private SpeechSynthesizer mSpeechSynthesizer;

    public VoiceModule(ReactApplicationContext ReactContext){
        super(ReactContext);
    }

    @Override
    public String getName(){
        return  "VoiceModule";
    }

    @reactMethod
    public void speak (String msg, int speaker){
      utils = new VoiceUtils();
      utils.init(getReactApplicationContext(), speaker);
      mSpeechSynthesizer = utils.getSyntheszer();
      this.mSpeechSynthesizer.speak(msg);
    }

    @Override
    public void onCatalystInstanceDestroy(){
      this.mSpeechSynthesizer.release();
      super.onCatalystInstanceDestroy();
    }


}
