package com.kstbridge

import android.content.Context
import android.graphics.Color
import android.util.TypedValue
import android.view.Gravity
import android.widget.FrameLayout
import android.widget.TextView

class KSTFabricView(context: Context) : FrameLayout(context) {
    private val textView: TextView

    init {
        // Default background color
        setBackgroundColor(Color.parseColor("#E0E0E0"))

        // Create and configure TextView
        textView = TextView(context).apply {
            gravity = Gravity.CENTER
            setTextSize(TypedValue.COMPLEX_UNIT_SP, 14f)
            setTextColor(Color.BLACK)
            setPadding(16, 16, 16, 16)
        }

        addView(
            textView,
            LayoutParams(
                LayoutParams.MATCH_PARENT,
                LayoutParams.MATCH_PARENT
            )
        )
    }

    fun setMessage(message: String?) {
        textView.text = message ?: ""
    }

    fun setBackgroundColorValue(color: Int?) {
        if (color != null) {
            setBackgroundColor(color)
        }
    }

    companion object {
        const val NAME = "KSTFabricView"
    }
}
