package com.kstbridge

import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class KSTFabricViewManager : SimpleViewManager<KSTFabricView>() {

    override fun getName(): String = KSTFabricView.NAME

    override fun createViewInstance(context: ThemedReactContext): KSTFabricView {
        return KSTFabricView(context)
    }

    @ReactProp(name = "message")
    fun setMessage(view: KSTFabricView, message: String?) {
        view.setMessage(message)
    }

    @ReactProp(name = "backgroundColor", customType = "Color")
    fun setBackgroundColor(view: KSTFabricView, color: Int?) {
        view.setBackgroundColorValue(color)
    }
}
