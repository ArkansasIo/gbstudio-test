package io.enchantment.htmlapp;

import android.annotation.SuppressLint;
import android.net.Uri;
import android.os.Bundle;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.webkit.WebViewAssetLoader;
import androidx.webkit.WebViewClientCompat;

public class MainActivity extends AppCompatActivity {
  private static final String START_URL =
      "https://appassets.androidplatform.net/assets/html_program/START_HERE.html";

  private WebView webView;

  @SuppressLint("SetJavaScriptEnabled")
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    webView = new WebView(this);
    setContentView(webView);

    final WebSettings settings = webView.getSettings();
    settings.setJavaScriptEnabled(true);
    settings.setDomStorageEnabled(true);
    settings.setDatabaseEnabled(true);
    settings.setMediaPlaybackRequiresUserGesture(false);
    settings.setAllowFileAccess(false);
    settings.setAllowContentAccess(true);
    settings.setBuiltInZoomControls(false);
    settings.setDisplayZoomControls(false);

    final WebViewAssetLoader assetLoader =
        new WebViewAssetLoader.Builder()
            .addPathHandler("/assets/", new WebViewAssetLoader.AssetsPathHandler(this))
            .build();

    webView.setWebViewClient(
        new WebViewClientCompat() {
          @Override
          public WebResourceResponse shouldInterceptRequest(
              @NonNull WebView view, @NonNull WebResourceRequest request) {
            return assetLoader.shouldInterceptRequest(request.getUrl());
          }

          @Override
          @SuppressWarnings("deprecation")
          public WebResourceResponse shouldInterceptRequest(WebView view, String url) {
            return assetLoader.shouldInterceptRequest(Uri.parse(url));
          }
        });

    if (savedInstanceState == null) {
      webView.loadUrl(START_URL);
    } else {
      webView.restoreState(savedInstanceState);
    }
  }

  @Override
  protected void onSaveInstanceState(@NonNull Bundle outState) {
    super.onSaveInstanceState(outState);
    webView.saveState(outState);
  }

  @Override
  @SuppressWarnings("deprecation")
  public void onBackPressed() {
    if (webView != null && webView.canGoBack()) {
      webView.goBack();
      return;
    }
    super.onBackPressed();
  }

  @Override
  protected void onDestroy() {
    if (webView != null) {
      webView.destroy();
      webView = null;
    }
    super.onDestroy();
  }
}
