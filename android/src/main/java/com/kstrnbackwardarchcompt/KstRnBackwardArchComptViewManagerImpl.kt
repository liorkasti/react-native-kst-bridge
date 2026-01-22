package com.kstrnbackwardarchcompt

import com.facebook.react.uimanager.ThemedReactContext

object KstRnBackwardArchComptViewManagerImpl {
  const val NAME = "KstRnBackwardArchComptView"

  fun createViewInstance(context: ThemedReactContext): KstRnBackwardArchComptView {
    return KstRnBackwardArchComptView(context)
  }

  fun setColor(view: KstRnBackwardArchComptView, color: String?) {
    view.setColor(color ?: "#FFFFFF")
  }
}
