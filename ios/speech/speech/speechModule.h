//
//  speechModule.h
//  speech
//
//  Created by Arron on 16/11/2.
//  Copyright © 2016年 somonus. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <AVFoundation/AVFoundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>
@interface speechModule : NSObject<RCTBridgeModule, AVSpeechSynthesizerDelegate>

@property (nonatomic, strong) RCTResponseSenderBlock callback;

@property (nonatomic, strong) AVSpeechSynthesizer *synthesizer;

@end

