package com.kstbridge

import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.facebook.react.uimanager.ViewManager
import java.util.HashMap

class KstBridgePackage : TurboReactPackage() {
  override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
    return when (name) {
      KstBridgeModuleImpl.NAME -> KstBridgeModule(reactContext)
      "KSTEventEmitter" -> KSTEventEmitter(reactContext)
      else -> null
    }
  }

  override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
    return ReactModuleInfoProvider {
      val moduleInfos: MutableMap<String, ReactModuleInfo> = HashMap()
      val isTurboModule: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
      moduleInfos[KstBridgeModuleImpl.NAME] =
              ReactModuleInfo(
                      KstBridgeModuleImpl.NAME,
                      KstBridgeModuleImpl.NAME,
                      false, // canOverrideExistingModule
                      false, // needsEagerInit
                      false, // isCxxModule
                      isTurboModule // isTurboModule
              )
      moduleInfos["KSTEventEmitter"] =
              ReactModuleInfo(
                      "KSTEventEmitter",
                      "KSTEventEmitter",
                      false, // canOverrideExistingModule
                      false, // needsEagerInit
                      false, // isCxxModule
                      isTurboModule // isTurboModule
              )
      moduleInfos
    }
  }

  override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
    return listOf(KSTFabricViewManager())
  }
}
