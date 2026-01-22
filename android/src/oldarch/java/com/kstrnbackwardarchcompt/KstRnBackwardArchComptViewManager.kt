package com.kstrnbackwardarchcompt

import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class KstRnBackwardArchComptViewManager : SimpleViewManager<KstRnBackwardArchComptView>() {

  override fun getName(): String = KstRnBackwardArchComptViewManagerImpl.NAME

  override fun createViewInstance(context: ThemedReactContext): KstRnBackwardArchComptView {
    return KstRnBackwardArchComptViewManagerImpl.createViewInstance(context)
  }

  @ReactProp(name = "color")
  fun setColor(view: KstRnBackwardArchComptView, color: String?) {
    KstRnBackwardArchComptViewManagerImpl.setColor(view, color)
  }
}
