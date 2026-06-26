# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in ${sdk.dir}/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# Capacitor
-keep class com.getcapacitor.** { *; }
-keep public class * extends com.getcapacitor.Plugin { *; }

# WebKit
-keep class androidx.webkit.** { *; }

# View
-keep public class * extends android.view.View { *; }
-keep public class * extends android.app.Activity { *; }
-keep public class * extends android.app.Service { *; }

-keepclassmembers class * {
  public <init>(android.content.Context);
  public <init>(android.content.Context, android.util.AttributeSet);
  public <init>(android.content.Context, android.util.AttributeSet, int);
  public void set*(...);
  *** get*();
}

-dontwarn androidx.**
-dontwarn com.google.**
-dontwarn org.apache.**
