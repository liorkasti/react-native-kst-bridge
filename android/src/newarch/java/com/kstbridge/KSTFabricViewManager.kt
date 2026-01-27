package com.kstbridge

import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.KSTFabricViewManagerDelegate
import com.facebook.react.viewmanagers.KSTFabricViewManagerInterface

@ReactModule(name = KSTFabricView.NAME)
class KSTFabricViewManager : SimpleViewManager<KSTFabricView>(),
    KSTFabricViewManagerInterface<KSTFabricView> {

    private val delegate = KSTFabricViewManagerDelegate(this)

    override fun getDelegate(): ViewManagerDelegate<KSTFabricView> = delegate

    override fun getName(): String = KSTFabricView.NAME

    override fun createViewInstance(context: ThemedReactContext): KSTFabricView {
        return KSTFabricView(context)
    }

    @ReactProp(name = "message")
    override fun setMessage(view: KSTFabricView, value: String?) {
        view.setMessage(value)
    }

    @ReactProp(name = "backgroundColor", customType = "Color")
    override fun setBackgroundColor(view: KSTFabricView, value: Int?) {
        view.setBackgroundColorValue(value)
    }
}
