import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('window');

// ─────────────────────────────────────────────
// Dados mockados dos jogos
// Futuramente substituir por chamadas à API Spring Boot
// ─────────────────────────────────────────────
const GAME_COVERS = [
  { id: '1',  title: 'Resident Evil Village', color: '#8B1A1A' },
  { id: '2',  title: 'The Last of Us',         color: '#2E4A1E' },
  { id: '3',  title: 'God of War',             color: '#1A2A3A' },
  { id: '4',  title: 'Cyberpunk 2077',         color: '#0D1B2A' },
  { id: '5',  title: 'Elden Ring',             color: '#3A2A0D' },
  { id: '6',  title: 'Hades',                  color: '#2A0D1A' },
  { id: '7',  title: 'Hollow Knight',          color: '#0D1A2A' },
  { id: '8',  title: 'Celeste',                color: '#1A0D2A' },
  { id: '9',  title: 'Dead Cells',             color: '#2A1A0D' },
  { id: '10', title: 'Returnal',               color: '#0D2A1A' },
  { id: '11', title: 'Disco Elysium',          color: '#1A2A0D' },
  { id: '12', title: 'Outer Wilds',            color: '#2A0D2A' },
];

// Divisão dos jogos por categoria
const WISHLIST  = GAME_COVERS.slice(0, 6);
const PLAYED    = GAME_COVERS.slice(2, 8);
const FAVORITES = GAME_COVERS.slice(4, 10);

// Tipo para controle das abas
type Tab = 'wishlist' | 'played' | 'favorites';

// ─────────────────────────────────────────────
// Card individual de jogo
// ─────────────────────────────────────────────
const GameCard = ({ item }: { item: (typeof GAME_COVERS)[0] }) => (
  <View style={[styles.gameCard, { backgroundColor: item.color }]}>
    <Text style={styles.gameCardText} numberOfLines={2}>
      {item.title}
    </Text>
  </View>
);

// ─────────────────────────────────────────────
// Tela principal de Perfil
// ─────────────────────────────────────────────
export default function ProfileScreen() {

  // Estado da aba ativa (wishlist | played | favorites)
  const [activeTab, setActiveTab] = useState<Tab>('wishlist');

  // Estado da foto de perfil (null = sem foto, mostra ícone padrão)
  const [avatar, setAvatar] = useState<string | null>(null);

  // Configuração das abas com seus dados
  const tabs: { key: Tab; label: string; data: typeof GAME_COVERS }[] = [
    { key: 'wishlist',  label: 'Lista de Desejos', data: WISHLIST  },
    { key: 'played',    label: 'Jogados',           data: PLAYED    },
    { key: 'favorites', label: 'Favoritos',         data: FAVORITES },
  ];

  // Dados da aba atualmente selecionada
  const currentData = tabs.find((t) => t.key === activeTab)?.data ?? [];

  // ── Função para abrir galeria e selecionar foto ──
  const pickImage = async () => {
    // Solicita permissão de acesso à galeria
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Precisamos de permissão para acessar suas fotos!');
      return;
    }

    // Abre a galeria com opções de corte
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,   // permite recortar
      aspect: [1, 1],        // recorte quadrado (para ficar redondo)
      quality: 0.8,          // qualidade da imagem (0 a 1)
    });

    // Se o usuário não cancelou, salva a URI da imagem
    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        /* ── HEADER: Avatar + Nome + Handle ── */
        <View style={styles.header}>

          /* Avatar clicável — abre galeria ao tocar */
          <TouchableOpacity
            style={styles.avatarWrap}
            onPress={pickImage}
            activeOpacity={0.8}
          >
            {avatar ? (
              // Mostra a foto selecionada
              <Image source={{ uri: avatar }} style={styles.avatarImage} />
            ) : (
              // Mostra ícone padrão quando não há foto
              <Ionicons name="person" size={40} color="#fff" />
            )}

            /* Badge de câmera no canto inferior direito */
            <View style={styles.avatarEditBadge}>
              <Ionicons name="camera" size={12} color="#fff" />
            </View>
          </TouchableOpacity>

          {/* Nome e handle do usuário */}
          <Text style={styles.userName}>Pedro Xits</Text>
          <Text style={styles.userHandle}>@pedroxits</Text>
        </View>

        //PREVIEW STRIP: Miniaturas dos jogos 
        <View style={styles.previewStrip}>
          {GAME_COVERS.slice(0, 6).map((g) => (
            <View
              key={g.id}
              style={[styles.previewThumb, { backgroundColor: g.color }]}
            />
          ))}
        </View>

        // ABAS: Lista de Desejos / Jogados / Favoritos 
        <View style={styles.tabRow}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tab,
                activeTab === tab.key && styles.tabActive, // destaca aba ativa
              ]}
              onPress={() => setActiveTab(tab.key)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.key && styles.tabTextActive,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        // GRID DE JOGOS: 2 colunas 
        <FlatList
          data={currentData}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.gridRow}
          contentContainerStyle={styles.gridContent}
          renderItem={({ item }) => <GameCard item={item} />}
          showsVerticalScrollIndicator={false}
        />

      </View>

      // BARRA DE NAVEGAÇÃO INFERIOR 
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={24} color="#9B9BB4" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="search-outline" size={24} color="#9B9BB4" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="bookmark-outline" size={24} color="#9B9BB4" />
        </TouchableOpacity>
        {/* Ícone de perfil ativo (roxo) */}
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person" size={24} color="#7C3AED" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ─────────────────────────────────────────────
// cores
// ─────────────────────────────────────────────
const PURPLE_BG     = '#1A0A2E'; // fundo principal
const PURPLE_CARD   = '#2D1B4E'; // cards e inputs
const PURPLE_ACCENT = '#7C3AED'; // roxo destaque
const TEXT_PRIMARY  = '#FFFFFF'; // texto principal
const TEXT_SECONDARY = '#9B9BB4'; // texto secundário

// ─────────────────────────────────────────────
// style
// ─────────────────────────────────────────────
const styles = StyleSheet.create({

  // Container raiz
  safeArea: {
    flex: 1,
    backgroundColor: PURPLE_BG,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  // ── Header ──
  header: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 16,
  },
  avatarWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: PURPLE_CARD,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: PURPLE_ACCENT,
    marginBottom: 10,
    overflow: 'hidden', // garante que a foto respeite o borderRadius
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  // Badge da câmera (canto inferior direito do avatar)
  avatarEditBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: PURPLE_ACCENT,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    letterSpacing: 0.5,
  },
  userHandle: {
    fontSize: 13,
    color: TEXT_SECONDARY,
    marginTop: 2,
  },

  // ── Preview strip ──
  previewStrip: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 20,
    justifyContent: 'center',
  },
  previewThumb: {
    width: 44,
    height: 60,
    borderRadius: 6,
  },

  // ── Abas ──
  tabRow: {
    flexDirection: 'row',
    backgroundColor: PURPLE_CARD,
    borderRadius: 10,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: PURPLE_ACCENT,
  },
  tabText: {
    fontSize: 11,
    fontWeight: '600',
    color: TEXT_SECONDARY,
  },
  tabTextActive: {
    color: TEXT_PRIMARY,
  },

  // ── Grid de jogos ──
  gridContent: {
    paddingBottom: 16,
  },
  gridRow: {
    gap: 12,
    marginBottom: 12,
  },
  gameCard: {
    flex: 1,
    height: 120,
    borderRadius: 10,
    padding: 8,
    justifyContent: 'flex-end',
  },
  gameCardText: {
    color: TEXT_PRIMARY,
    fontSize: 11,
    fontWeight: '600',
  },

  // ── Barra de navegação inferior ──
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#120820',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: PURPLE_CARD,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
});