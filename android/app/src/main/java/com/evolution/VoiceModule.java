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

import com.baidu.tts.auth.AuthInfo;
import com.baidu.tts.chainofresponsibility.logger.LoggerProxy;
import com.baidu.tts.client.SpeechSynthesizer;
import com.baidu.tts.client.SpeechSynthesizerListener;
import com.baidu.tts.client.TtsMode;

import java.util.Arrays;
import java.util.List;

public class VoiceModule extends ReactContextBaseJavaModule{
    private VoiceUtils utils;
    private SpeechSynthesizer mSpeechSynthesizer;

    protected String appId = "10704888";

    protected String appKey = "GT7wtUqYqmR7BPsD2GRuH0Gn";

    protected String secretKey = "KZd515cOM5rqcINAGVnOX8rAVSHwGMSH";

    public VoiceModule(ReactApplicationContext ReactContext){
        super(ReactContext);
    }

    @Override
    public String getName(){
        return  "VoiceModule";
    }

    @reactMethod
    public void speak (String msg, int speaker){

      mSpeechSynthesizer.setAppId(appId);
      mSpeechSynthesizer.setApiKey(appKey, secretKey);

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
