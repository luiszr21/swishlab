import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import { cores, espacamento } from '../constants/theme';

function toEmbedUrl(raw: string) {
  try {
    const url = decodeURIComponent(raw);
    if (url.includes('youtube.com/watch')) {
      const match = url.match(/[?&]v=([^&]+)/);
      if (match && match[1]) return `https://www.youtube.com/embed/${match[1]}?autoplay=0&controls=1`;
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1].split(/[?&]/)[0];
      if (id) return `https://www.youtube.com/embed/${id}?autoplay=0&controls=1`;
    }
    // fallback: try to use raw url
    return url;
  } catch {
    return raw;
  }
}

function extractYoutubeId(raw: string) {
  try {
    const url = decodeURIComponent(raw);
    if (url.includes('youtube.com/watch')) {
      const match = url.match(/[?&]v=([^&]+)/);
      if (match && match[1]) return match[1];
    }
    if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1].split(/[?&]/)[0];
    }
    return null;
  } catch {
    return null;
  }
}

function createYouTubeHtml(videoId: string, start?: number, end?: number) {
  const startSec = start != null ? start : 0;
  const endSec = end != null ? end : undefined;
  const endCheck = endSec != null ? `if (currentTime >= ${endSec}) { player.pauseVideo(); clearInterval(checkInterval); }` : '';

  return `
  <!doctype html>
  <html>
    <head>
      <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
      <style>html,body,#player{height:100%;width:100%;margin:0;padding:0;background:#000}</style>
    </head>
    <body>
      <div id="player"></div>
      <script>
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        var player;
        function onYouTubeIframeAPIReady() {
          player = new YT.Player('player', {
            height: '100%',
            width: '100%',
            videoId: '${videoId}',
            playerVars: { controls: 1, rel: 0, modestbranding: 1, playsinline: 1 },
            events: {
              'onReady': onPlayerReady
            }
          });
        }

        function onPlayerReady(event) {
          try {
            event.target.seekTo(${startSec}, true);
            event.target.playVideo();
            var checkInterval = setInterval(function() {
              var currentTime = player.getCurrentTime();
              ${endCheck}
            }, 100);
          } catch(e) {
            console.error(e);
          }
        }
      </script>
    </body>
  </html>
  `;
}

export default function VideoPlayer() {
  const router = useRouter();
  const { url, start, end } = useLocalSearchParams<{ url: string; start?: string; end?: string }>();
  const decoded = url ? decodeURIComponent(url) : undefined;
  const startNum = start ? parseFloat(start) : undefined;
  const endNum = end ? parseFloat(end) : undefined;

  const videoId = decoded ? extractYoutubeId(decoded) : null;

  let source: any = undefined;
  if (videoId && (startNum != null || endNum != null)) {
    source = { html: createYouTubeHtml(videoId, startNum, endNum) };
  } else if (decoded) {
    source = { uri: toEmbedUrl(decoded) };
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={cores.fundo} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>
      </View>
      {source ? (
        <WebView
          originWhitelist={["*"]}
          source={source}
          style={styles.webview}
          allowsFullscreenVideo
          javaScriptEnabled
          startInLoadingState
          renderLoading={() => (
            <View style={styles.loading}><ActivityIndicator size="large" color="#fff" /></View>
          )}
        />
      ) : (
        <View style={styles.loading}><Text style={{ color: cores.textoPrimario }}>URL inválida</Text></View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  header: { padding: espacamento.lg },
  backButton: { paddingVertical: 6, paddingHorizontal: 8 },
  backText: { color: cores.destaque, fontWeight: '600' },
  webview: { flex: 1, backgroundColor: '#000' },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
