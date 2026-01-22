package com.kstrnbackwardarchcompt

import com.facebook.react.bridge.ReactApplicationContext

class KstRnBackwardArchComptModule(reactContext: ReactApplicationContext) :
  NativeKstRnBackwardArchComptSpec(reactContext) {

  override fun multiply(a: Double, b: Double): Double {
    return a * b
  }

  companion object {
    const val NAME = NativeKstRnBackwardArchComptSpec.NAME
  }
}
