package com.kstrnbackwardarchcompt

import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.KstRnBackwardArchComptViewManagerDelegate
import com.facebook.react.viewmanagers.KstRnBackwardArchComptViewManagerInterface

@ReactModule(name = KstRnBackwardArchComptViewManagerImpl.NAME)
class KstRnBackwardArchComptViewManager : SimpleViewManager<KstRnBackwardArchComptView>(),
  KstRnBackwardArchComptViewManagerInterface<KstRnBackwardArchComptView> {

  private val delegate: ViewManagerDelegate<KstRnBackwardArchComptView> =
    KstRnBackwardArchComptViewManagerDelegate(this)

  override fun getDelegate(): ViewManagerDelegate<KstRnBackwardArchComptView> = delegate

  override fun getName(): String = KstRnBackwardArchComptViewManagerImpl.NAME

  override fun createViewInstance(context: ThemedReactContext): KstRnBackwardArchComptView {
    return KstRnBackwardArchComptViewManagerImpl.createViewInstance(context)
  }

  override fun setColor(view: KstRnBackwardArchComptView, color: String?) {
    KstRnBackwardArchComptViewManagerImpl.setColor(view, color)
  }
}
