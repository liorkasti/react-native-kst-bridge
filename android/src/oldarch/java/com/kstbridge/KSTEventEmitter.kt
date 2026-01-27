package com.kstbridge

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableType
import com.facebook.react.modules.core.DeviceEventManagerModule

class KSTEventEmitter(reactContext: ReactApplicationContext) :
        ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "KSTEventEmitter"
    }

    @ReactMethod
    fun addListener(eventName: String) {
        // Required for event emitter interface
    }

    @ReactMethod
    fun removeListeners(count: Double) {
        // Required for event emitter interface
    }

    @ReactMethod
    fun emit(eventName: String, args: ReadableArray?) {
        val eventEmitter =
                reactApplicationContext.getJSModule(
                        DeviceEventManagerModule.RCTDeviceEventEmitter::class.java
                )

        if (args != null && args.size() > 0) {
            // Convert ReadableArray to WritableArray if needed
            val writableArray = Arguments.createArray()
            for (i in 0 until args.size()) {
                when (args.getType(i)) {
                    ReadableType.Null -> writableArray.pushNull()
                    ReadableType.Boolean -> writableArray.pushBoolean(args.getBoolean(i))
                    ReadableType.Number -> writableArray.pushDouble(args.getDouble(i))
                    ReadableType.String -> writableArray.pushString(args.getString(i))
                    ReadableType.Map -> writableArray.pushMap(args.getMap(i))
                    ReadableType.Array -> writableArray.pushArray(args.getArray(i))
                }
            }
            eventEmitter.emit(eventName, writableArray)
        } else {
            // Emit with null data
            eventEmitter.emit(eventName, null)
        }
    }
}
