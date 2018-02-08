package com.looknext.ai2v;

import android.content.pm.PackageManager;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;

import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.baidu.tts.auth.AuthInfo;
import com.baidu.tts.chainofresponsibility.logger.LoggerProxy;
import com.baidu.tts.client.SpeechSynthesizer;
import com.baidu.tts.client.SpeechSynthesizerListener;
import com.baidu.tts.client.TtsMode;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Callback;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReactContext;

import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;

public class VoiceModule extends ReactContextBaseJavaModule{
//    private VoiceUtils utils;

    protected String appId = "10721023";

    protected String appKey = "Lb77YgiPFBmUSRr5M0gHl1Uj";

    protected String secretKey = "wX6mWzZIMdzaVIjp8dCSNKwWqz8nFthz";
    protected SpeechSynthesizer mSpeechSynthesizer;
    private  int resut=0;
    public VoiceModule(ReactApplicationContext reactContext){
        super(reactContext);
        this.initPermission();
        mSpeechSynthesizer = SpeechSynthesizer.getInstance();
        mSpeechSynthesizer.setAppId(appId);
         mSpeechSynthesizer.setApiKey(appKey, secretKey);
        mSpeechSynthesizer.auth(TtsMode.ONLINE);
        mSpeechSynthesizer.setParam(SpeechSynthesizer.PARAM_SPEAKER, "1");
        mSpeechSynthesizer.initTts(TtsMode.ONLINE);
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
//        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
//        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }
    @Override
    public String getName(){
        return  "VoiceModule";
    }

    @ReactMethod
    public void speak (String msg, int speaker, Callback errorCallback,
                       Callback successCallback){
        System.out.print(msg);
//      utils = new VoiceUtils();
//        utils.init(getReactApplicationContext(), speaker);
//        mSpeechSynthesizer = utils.getSyntheszer();
        try {
            MiniActivity mm=new MiniActivity();
            mm.speak(errorCallback,successCallback);
            int result = 0;
//            result=  this.mSpeechSynthesizer.speak("欢迎");
//
//            successCallback.invoke(resut+"-"+result);
        }catch (IllegalViewOperationException e){
            errorCallback.invoke(e.getMessage());

        }


    }

    @Override
    public void onCatalystInstanceDestroy(){
      this.mSpeechSynthesizer.release();
      super.onCatalystInstanceDestroy();
    }
    /**
     * android 6.0 以上需要动态申请权限
     */
    private void initPermission() {
        String[] permissions = {
                android.Manifest.permission.INTERNET,
                android.Manifest.permission.ACCESS_NETWORK_STATE,
                android.Manifest.permission.MODIFY_AUDIO_SETTINGS,
                android.Manifest.permission.WRITE_EXTERNAL_STORAGE,
                android.Manifest.permission.WRITE_SETTINGS,
                android.Manifest.permission.READ_PHONE_STATE,
                android.Manifest.permission.ACCESS_WIFI_STATE,
                android.Manifest.permission.CHANGE_WIFI_STATE
        };

        ArrayList<String> toApplyList = new ArrayList<String>();

        for (String perm : permissions) {
            if (PackageManager.PERMISSION_GRANTED != ContextCompat.checkSelfPermission(this.getReactApplicationContext(), perm)) {
                toApplyList.add(perm);
                // 进入到这里代表没有权限.
            }
        }
        String[] tmpList = new String[toApplyList.size()];
        if (!toApplyList.isEmpty()) {
            ActivityCompat.requestPermissions(this.getReactApplicationContext().getCurrentActivity(), toApplyList.toArray(tmpList), 123);
        }

    }




}
