package com.kstrnbackwardarchcompt

import android.content.Context
import android.util.AttributeSet
import android.view.View
import android.widget.FrameLayout

class KstRnBackwardArchComptView : FrameLayout {
  private var color: String = "#FFFFFF"

  constructor(context: Context) : super(context)
  constructor(context: Context, attrs: AttributeSet?) : super(context, attrs)
  constructor(context: Context, attrs: AttributeSet?, defStyleAttr: Int) : super(context, attrs, defStyleAttr)

  fun setColor(color: String) {
    this.color = color
    try {
      setBackgroundColor(android.graphics.Color.parseColor(color))
    } catch (e: IllegalArgumentException) {
      setBackgroundColor(android.graphics.Color.WHITE)
    }
  }
}
