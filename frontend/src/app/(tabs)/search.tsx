import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 48) / 3; // 3 columns with gaps

// ── Mock games
const ALL_GAMES = [
  { id: '1',  title: 'Resident Evil 1',     color: '#4A0E0E', genre: 'Horror' },
  { id: '2',  title: 'Resident Evil 2',     color: '#6B1414', genre: 'Horror' },
  { id: '3',  title: 'Resident Evil 3',     color: '#8B1A1A', genre: 'Horror' },
  { id: '4',  title: 'Resident Evil 4',     color: '#5C2A0E', genre: 'Horror' },
  { id: '5',  title: 'Resident Evil 5',     color: '#3A1A0E', genre: 'Horror' },
  { id: '6',  title: 'Resident Evil 6',     color: '#1A0E0E', genre: 'Horror' },
  { id: '7',  title: 'Resident Evil 7',     color: '#2A0A14', genre: 'Horror' },
  { id: '8',  title: 'RE Village',          color: '#1C1A0A', genre: 'Horror' },
  { id: '9',  title: 'God of War',          color: '#1A2A3A', genre: 'Action' },
  { id: '10', title: 'The Last of Us',      color: '#2E4A1E', genre: 'Adventure' },
  { id: '11', title: 'Cyberpunk 2077',      color: '#0D1B2A', genre: 'RPG' },
  { id: '12', title: 'Elden Ring',          color: '#3A2A0D', genre: 'RPG' },
  { id: '13', title: 'Hades',               color: '#2A0D1A', genre: 'Roguelike' },
  { id: '14', title: 'Hollow Knight',       color: '#0D1A2A', genre: 'Metroidvania' },
  { id: '15', title: 'Celeste',             color: '#1A0D2A', genre: 'Platformer' },
  { id: '16', title: 'Dead Cells',          color: '#2A1A0D', genre: 'Roguelike' },
];

// ── Logo placeholder (mostra se você não pesquisar nada) ────────────────────────────
const LogoPlaceholder = () => (
  <View style={styles.logoWrap}>
    <View style={styles.logoInner}>
      <Text style={styles.logoG}>G</Text>
      <Text style={styles.logoPlus}>+</Text>
    </View>
    <Text style={styles.logoB}>B</Text>
    <View style={styles.logoDot1} />
    <View style={styles.logoDot2} />
  </View>
);

// game card (compacto)
const GameCard = ({ item }: { item: (typeof ALL_GAMES)[0] }) => (
  <TouchableOpacity
    activeOpacity={0.8}
    style={[styles.gameCard, { backgroundColor: item.color }]}
  >
    <View style={styles.gameCardOverlay} />
    <Text style={styles.gameCardTitle} numberOfLines={2}>
      {item.title}
    </Text>
  </TouchableOpacity>
);

// tela
export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof ALL_GAMES>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback((text: string) => {
    setQuery(text);
    if (!text.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    // Simulate async search (swap for real API call)
    setTimeout(() => {
      const filtered = ALL_GAMES.filter((g) =>
        g.title.toLowerCase().includes(text.toLowerCase())
      );
      setResults(filtered);
      setLoading(false);
    }, 300);
  }, []);

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        /* ── Search bar ── */
        <View style={styles.searchBarWrap}>
          <Ionicons name="search" size={18} color="#9B9BB4" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar jogos"
            placeholderTextColor="#9B9BB4"
            value={query}
            onChangeText={handleSearch}
            returnKeyType="search"
            autoCorrect={false}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={clearSearch}>
              <Ionicons name="close-circle" size={18} color="#9B9BB4" />
            </TouchableOpacity>
          )}
        </View>

        // Body
        {loading ? (
          <View style={styles.centered}>
            <ActivityIndicator color="#7C3AED" size="large" />
          </View>
        ) : query.length === 0 ? (
          // Empty state – show logo
          <View style={styles.centered}>
            <LogoPlaceholder />
          </View>
        ) : results.length === 0 ? (
          // No results
          <View style={styles.centered}>
            <Ionicons name="game-controller-outline" size={48} color="#3D2060" />
            <Text style={styles.emptyText}>Nenhum jogo encontrado</Text>
            <Text style={styles.emptySubtext}>Tente outro nome</Text>
          </View>
        ) : (
          // Results grid
          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            numColumns={3}
            columnWrapperStyle={styles.gridRow}
            contentContainerStyle={styles.gridContent}
            renderItem={({ item }) => <GameCard item={item} />}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          />
        )}
      </View>

        // botão de navegação 
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={24} color="#9B9BB4" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="search" size={24} color="#7C3AED" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="bookmark-outline" size={24} color="#9B9BB4" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="#9B9BB4" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const PURPLE_BG = '#1A0A2E';
const PURPLE_CARD = '#2D1B4E';
const PURPLE_ACCENT = '#7C3AED';
const TEXT_PRIMARY = '#FFFFFF';
const TEXT_SECONDARY = '#9B9BB4';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: PURPLE_BG,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  // Search bar
  searchBarWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PURPLE_CARD,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: TEXT_PRIMARY,
    fontSize: 15,
    padding: 0,
  },

  // Body states
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: TEXT_PRIMARY,
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },
  emptySubtext: {
    color: TEXT_SECONDARY,
    fontSize: 13,
    marginTop: 4,
  },

  // Logo placeholder
  logoWrap: {
    width: 140,
    height: 140,
    backgroundColor: '#120820',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  logoInner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  logoG: {
    fontSize: 52,
    fontWeight: '800',
    color: TEXT_PRIMARY,
    lineHeight: 60,
  },
  logoPlus: {
    fontSize: 24,
    fontWeight: '800',
    color: PURPLE_ACCENT,
    marginTop: 4,
  },
  logoB: {
    fontSize: 36,
    fontWeight: '800',
    color: '#C084FC',
    position: 'absolute',
    bottom: 20,
    right: 28,
  },
  logoDot1: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: PURPLE_ACCENT,
    position: 'absolute',
    bottom: 22,
    left: 22,
  },
  logoDot2: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E879F9',
    position: 'absolute',
    bottom: 18,
    left: 40,
  },

  // Grid
  gridContent: {
    paddingBottom: 16,
  },
  gridRow: {
    gap: 8,
    marginBottom: 8,
  },
  gameCard: {
    width: CARD_SIZE,
    height: CARD_SIZE * 1.4,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: 6,
  },
  gameCardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  gameCardTitle: {
    color: TEXT_PRIMARY,
    fontSize: 10,
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },

  // Bottom nav
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
