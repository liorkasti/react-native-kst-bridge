package com.kstbridge

import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap

class KstBridgeModule internal constructor(context: ReactApplicationContext) :
        ReactContextBaseJavaModule(context) {
  val moduleImpl = KstBridgeModuleImpl()

  @ReactMethod
  fun multiply(a: Double, b: Double, promise: Promise) {
    moduleImpl.multiply(a, b, promise)
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun reverseString(str: String): String {
    return moduleImpl.reverseString(str)
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun getNumbers(): WritableArray {
    return moduleImpl.getNumbers()
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun getOBject(): WritableMap {
    return moduleImpl.getOBject()
  }

  @ReactMethod(isBlockingSynchronousMethod = false)
  fun promiseNumber(value: Double, promise: Promise) {
    moduleImpl.promiseNumber(value, promise)
  }

  @ReactMethod(isBlockingSynchronousMethod = false)
  fun callMeLater(successCB: Callback, failureCB: Callback) {
    moduleImpl.callMeLater(successCB, failureCB)
  }

  override fun getName(): String {
    return KstBridgeModuleImpl.NAME
  }
}
