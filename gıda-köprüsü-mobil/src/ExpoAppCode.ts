export const expoCode = `import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  FlatList, 
  StatusBar, 
  ActivityIndicator 
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { 
  useFonts, 
  Urbanist_400Regular, 
  Urbanist_600SemiBold, 
  Urbanist_700Bold 
} from '@expo-google-fonts/urbanist';

const COLORS = {
  bg: '#111827',
  card: '#1F2937',
  primary: '#DDA63A',
  textMain: '#FFFFFF',
  textSub: '#9CA3AF',
  danger: '#EF4444',
  dangerBg: 'rgba(239, 68, 68, 0.15)',
  warningBg: 'rgba(221, 166, 58, 0.15)',
};

const EMERGENCY_DATA = [
  { id: '1', name: 'Bizim Fırın', product: '10 Adet Simit & Poğaça', time: 'Son 2 saat', distance: '200m' },
  { id: '2', name: 'Yeşil Manav', product: 'Karışık Meyve Kutusu', time: 'Son 45 dk', distance: '500m' },
  { id: '3', name: 'Tatlıcı Ali', product: 'Kalan Sütlü Tatlılar', time: 'Son 1 saat', distance: '1.2km' },
];

const NEEDS_DATA = [
  { id: '1', name: 'Ahmet Yılmaz', title: 'Aile Gıda Paketi', location: 'Kadıköy', distance: '1.5km', urgency: 'Yüksek' },
  { id: '2', name: 'Ayşe Demir', title: 'Sıcak Yemek', location: 'Üsküdar', distance: '3km', urgency: 'Orta' },
  { id: '3', name: 'Mehmet Çelik', title: 'Bebek Maması', location: 'Beşiktaş', distance: '5km', urgency: 'Acil' }
];

const DEALS_DATA = [
  { id: '1', name: 'Migros', product: 'Sebze Paketi (SKT Yakın)', old: '150₺', new: '50₺' },
  { id: '2', name: 'Starbucks', product: 'Akşam Fırın Ürünleri', old: '200₺', new: '70₺' },
  { id: '3', name: 'Burger King', product: 'Gün Sonu Menüleri', old: '250₺', new: '100₺' },
  { id: '4', name: 'CarrefourSA', product: 'Temel Gıda Sepeti (SKT Yakın)', old: '300₺', new: '120₺' }
];

const COURIER_DATA = [
  { id: '1', from: 'Bizim Fırın', to: 'Ahmet (İhtiyaç)', reward: '50 Puan', distance: '2.5km' },
  { id: '2', from: 'Yeşil Manav', to: 'Aşevi', reward: '100 Puan', distance: '4km' },
  { id: '3', from: 'Tatlıcı Ali', to: 'Ayşe (İhtiyaç)', reward: '75 Puan', distance: '1.8km' }
];

const NOTIFICATIONS_DATA = [
  { id: '1', title: 'Kurye Yola Çıktı 🛵', desc: "Bizim Fırın'dan aldığınız ürün kuryede.", time: '10 dk önce', unread: true },
  { id: '2', title: 'Yeni Fırsat Yakala! 🏷️', desc: 'Migros sebze paketini %70 indirimle ekledi.', time: '1 saat önce', unread: true },
  { id: '3', title: 'Bağışınız Ulaştı 💖', desc: 'Ahmet Yılmaz ailesine destek oldunuz. Teşekkürler!', time: 'Dün', unread: false }
];

const HomeScreen = ({ onNavigate, onProductSelect }) => (
  <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent}>
    {/* Header */}
    <View style={[styles.header, { alignItems: 'flex-start' }]}>
      <View>
        <Text style={{ fontFamily: 'Urbanist_700Bold', fontSize: 28, color: COLORS.textMain, letterSpacing: -1 }}>
          Gıda<Text style={{ color: COLORS.primary }}>Köprüsü</Text>
        </Text>
        <Text style={{ fontFamily: 'Urbanist_600SemiBold', fontSize: 11, color: COLORS.textSub, marginTop: 2, letterSpacing: 1, textTransform: 'uppercase' }}>
          İsrafı Önle, Hayata Bağla.
        </Text>
        <Text style={{ fontFamily: 'Urbanist_700Bold', fontSize: 22, color: COLORS.textMain, marginTop: 24 }}>
          Hoş geldin, Berke 👋
        </Text>
      </View>
      <View style={{ alignItems: 'flex-end', gap: 12 }}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity style={styles.bellButton} onPress={() => onNavigate('cart')}>
            <FontAwesome5 name="shopping-cart" size={20} color={COLORS.textMain} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bellButton} onPress={() => onNavigate('notifications')}>
            <FontAwesome5 name="bell" size={20} color={COLORS.textMain} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.bellButton} onPress={() => onNavigate('qr')}>
          <FontAwesome5 name="qrcode" size={20} color={COLORS.textMain} />
        </TouchableOpacity>
      </View>
    </View>

    {/* Hero Section */}
    <View style={styles.heroCard}>
      <View style={styles.heroRow}>
        <View style={styles.heroIconContainer}>
          <FontAwesome5 name="box-open" size={20} color={COLORS.primary} />
        </View>
        <View style={styles.heroTextContainer}>
          <Text style={styles.heroLabel}>Bugüne kadar kurtarılan gıda</Text>
          <Text style={styles.heroValue}>125 kg</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.heroRow}>
        <View style={styles.heroIconContainer}>
          <FontAwesome5 name="smile" size={20} color={COLORS.primary} />
        </View>
        <View style={styles.heroTextContainer}>
          <Text style={styles.heroLabel}>Memnun İhtiyaç Sahibi</Text>
          <Text style={styles.heroValue}>1,250 Kişi</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.heroRow}>
        <View style={styles.heroIconContainer}>
          <FontAwesome5 name="store" size={20} color={COLORS.primary} />
        </View>
        <View style={styles.heroTextContainer}>
          <Text style={styles.heroLabel}>Platforma Üye İşletme</Text>
          <Text style={styles.heroValue}>85 İşletme</Text>
        </View>
      </View>
    </View>

    {/* Quick Actions */}
    <View style={styles.actionsContainer}>
      <TouchableOpacity style={styles.actionBtn} onPress={() => onNavigate('deals')}>
        <FontAwesome5 name="tags" size={20} color={COLORS.primary} style={{ marginBottom: 8 }} />
        <Text style={styles.actionTextSmall}>Fırsatlar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionBtn} onPress={() => onNavigate('donate')}>
        <FontAwesome5 name="piggy-bank" size={20} color={COLORS.primary} style={{ marginBottom: 8 }} />
        <Text style={styles.actionTextSmall}>Kumbara</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionBtn} onPress={() => onNavigate('courier')}>
        <FontAwesome5 name="motorcycle" size={20} color={COLORS.primary} style={{ marginBottom: 8 }} />
        <Text style={styles.actionTextSmall}>Kurye Ol</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionBtn} onPress={() => onNavigate('pickup')}>
        <FontAwesome5 name="walking" size={20} color={COLORS.primary} style={{ marginBottom: 8 }} />
        <Text style={styles.actionTextSmall}>Gel Al</Text>
      </TouchableOpacity>
    </View>

    {/* Nearby Businesses */}
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>Kurtarılmayı Bekleyen Ürünler</Text>
    </View>
    
    <FlatList
      data={EMERGENCY_DATA}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={296} // card width (280) + margin (16)
      decelerationRate="fast"
      keyExtractor={item => item.id}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => (
        <View style={styles.emergencyCard}>
          <View style={styles.emergencyTop}>
            <Text style={styles.businessName} numberOfLines={1}>{item.name}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.time}</Text>
            </View>
          </View>
          <Text style={styles.productInfo} numberOfLines={2}>{item.product}</Text>
          <View style={styles.emergencyBottom}>
            <Text style={styles.distanceText}>
              <FontAwesome5 name="map-marker-alt" size={10} color={COLORS.textSub} /> {item.distance}
            </Text>
            <TouchableOpacity style={styles.buyBtn} onPress={() => { onProductSelect(item); onNavigate('productDetail'); }}>
              <Text style={styles.buyBtnText}>Al</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />

    {/* People in Need */}
    <View style={[styles.sectionHeader, { marginTop: 24 }]}>
      <Text style={styles.sectionTitle}>İhtiyaç Sahipleri</Text>
    </View>
    
    <FlatList
      data={NEEDS_DATA}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={296} // card width (280) + margin (16)
      decelerationRate="fast"
      keyExtractor={item => item.id}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => (
        <View style={[styles.emergencyCard, { borderColor: 'rgba(255,255,255,0.05)', borderWidth: 1 }]}>
          <View style={styles.emergencyTop}>
            <Text style={styles.businessName} numberOfLines={1}>{item.name}</Text>
            <View style={[styles.badge, item.urgency === 'Acil' ? {backgroundColor: COLORS.dangerBg} : {backgroundColor: COLORS.warningBg}]}>
              <Text style={[styles.badgeText, item.urgency === 'Acil' ? {color: COLORS.danger} : {color: COLORS.primary}]}>{item.urgency}</Text>
            </View>
          </View>
          <Text style={[styles.productInfo, { height: 40, marginBottom: 10 }]} numberOfLines={2}>
            {item.title}{'\n'}{item.location}
          </Text>
          <View style={styles.emergencyBottom}>
            <Text style={styles.distanceText}>
              <FontAwesome5 name="map-marker-alt" size={10} color={COLORS.textSub} /> {item.distance}
            </Text>
            <TouchableOpacity style={[styles.buyBtn, {backgroundColor: 'rgba(255,255,255,0.1)'}]} onPress={() => onNavigate('donate')}>
              <Text style={[styles.buyBtnText, {color: COLORS.textMain}]}>Destek Ol</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
    <View style={{ height: 100 }} />
  </ScrollView>
);

const DealsScreen = ({ onBack }) => (
  <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent}>
    <View style={styles.headerWithBack}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <FontAwesome5 name="arrow-left" size={20} color={COLORS.textMain} />
      </TouchableOpacity>
      <Text style={styles.pageTitle}>Fırsatlar</Text>
      <View style={{ width: 40 }} />
    </View>
    <View style={{ paddingHorizontal: 20 }}>
      {DEALS_DATA.map(deal => (
        <View key={deal.id} style={styles.dealCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.dealName}>{deal.name}</Text>
            <Text style={styles.dealProduct}>{deal.product}</Text>
            <View style={styles.priceRow}>
              <Text style={styles.oldPrice}>{deal.old}</Text>
              <Text style={styles.newPrice}>{deal.new}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.dealBtn}>
            <Text style={styles.dealBtnText}>Kap</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  </ScrollView>
);

const PickupScreen = ({ onBack }) => (
  <ScrollView style={[styles.scrollArea, { paddingHorizontal: 20 }]} showsVerticalScrollIndicator={false}>
    <View style={styles.headerWithBack}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <FontAwesome5 name="arrow-left" size={20} color={COLORS.textMain} />
      </TouchableOpacity>
      <Text style={styles.pageTitle}>Gel Al Teslimat</Text>
      <View style={{ width: 40 }} />
    </View>

    <View style={{ backgroundColor: COLORS.card, padding: 20, borderRadius: 16, marginTop: 24, marginBottom: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' }}>
       <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
         <FontAwesome5 name="map-marker-alt" size={16} color={COLORS.primary} style={{ marginRight: 8 }} />
         <Text style={{ fontFamily: 'Urbanist_700Bold', fontSize: 16, color: COLORS.textMain }}>Teslimat Rotası</Text>
       </View>
       
       <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.bg, padding: 16, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' }}>
          <View>
             <Text style={{ fontFamily: 'Urbanist_600SemiBold', fontSize: 12, color: COLORS.textSub, marginBottom: 4 }}>Hedef İşletme</Text>
             <Text style={{ fontFamily: 'Urbanist_700Bold', fontSize: 16, color: COLORS.textMain }}>Bizim Fırın</Text>
          </View>
          <FontAwesome5 name="walking" size={24} color={COLORS.primary} />
          <View style={{ alignItems: 'flex-end' }}>
             <Text style={{ fontFamily: 'Urbanist_600SemiBold', fontSize: 12, color: COLORS.textSub, marginBottom: 4 }}>Kalan Mesafe</Text>
             <Text style={{ fontFamily: 'Urbanist_700Bold', fontSize: 16, color: COLORS.textMain }}>1.2 km</Text>
          </View>
       </View>
    </View>

    <Text style={{ fontFamily: 'Urbanist_700Bold', fontSize: 18, color: COLORS.textMain, marginBottom: 16 }}>Sağlık Verilerin (Yürüyüş)</Text>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 }}>
       <View style={{ backgroundColor: COLORS.card, padding: 20, borderRadius: 16, width: '48%', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' }}>
         <View style={{ width: 48, height: 48, backgroundColor: 'rgba(74, 222, 128, 0.1)', borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginBottom: 12 }}>
           <FontAwesome5 name="shoe-prints" size={20} color="#4ade80" />
         </View>
         <Text style={{ fontFamily: 'Urbanist_700Bold', fontSize: 24, color: COLORS.textMain, marginBottom: 4 }}>1,452</Text>
         <Text style={{ fontFamily: 'Urbanist_600SemiBold', fontSize: 12, color: COLORS.textSub }}>Adım Atıldı</Text>
       </View>
       <View style={{ backgroundColor: COLORS.card, padding: 20, borderRadius: 16, width: '48%', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' }}>
         <View style={{ width: 48, height: 48, backgroundColor: 'rgba(251, 146, 60, 0.1)', borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginBottom: 12 }}>
           <FontAwesome5 name="fire" size={20} color="#fb923c" />
         </View>
         <Text style={{ fontFamily: 'Urbanist_700Bold', fontSize: 24, color: COLORS.textMain, marginBottom: 4 }}>85</Text>
         <Text style={{ fontFamily: 'Urbanist_600SemiBold', fontSize: 12, color: COLORS.textSub }}>Kcal Yakıldı</Text>
       </View>
    </View>

    <Text style={{ fontFamily: 'Urbanist_700Bold', fontSize: 18, color: COLORS.textMain, marginBottom: 16 }}>Ekstra Ödül 🎁</Text>
    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(221, 166, 58, 0.1)', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(221, 166, 58, 0.3)', marginBottom: 40 }}>
      <View style={{ width: 56, height: 56, backgroundColor: 'rgba(221, 166, 58, 0.2)', borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginRight: 16 }}>
        <FontAwesome5 name="gift" size={24} color={COLORS.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: 'Urbanist_700Bold', fontSize: 14, color: COLORS.textMain, marginBottom: 4 }}>Doğa Dostu Teslimat!</Text>
        <Text style={{ fontFamily: 'Urbanist_400Regular', fontSize: 12, color: COLORS.textSub, marginBottom: 12, lineHeight: 18 }}>Yürüyerek teslim aldığın için karbon salınımını önledin ve kupon kazandın.</Text>
        <View style={{ alignSelf: 'flex-start', backgroundColor: COLORS.primary, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 }}>
          <Text style={{ fontFamily: 'Urbanist_700Bold', fontSize: 10, color: COLORS.bg, letterSpacing: 1 }}>DOGA15 - %15 İNDİRİM</Text>
        </View>
      </View>
    </View>
  </ScrollView>
);

const CourierScreen = ({ onBack }) => (
  <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent}>
    <View style={styles.headerWithBack}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <FontAwesome5 name="arrow-left" size={20} color={COLORS.textMain} />
      </TouchableOpacity>
      <Text style={styles.pageTitle}>Gönüllü Kurye</Text>
      <View style={{ width: 40 }} />
    </View>
    <View style={{ paddingHorizontal: 20 }}>
      {COURIER_DATA.map(task => (
        <View key={task.id} style={styles.courierCard}>
          <View style={styles.courierTop}>
            <View style={{ flex: 1 }}>
              <Text style={styles.courierLabel}>Alış:</Text>
              <Text style={styles.courierLocation}>{task.from}</Text>
            </View>
            <FontAwesome5 name="arrow-right" size={16} color={COLORS.primary} style={{ marginTop: 15, marginHorizontal: 10 }} />
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={styles.courierLabel}>Teslimat:</Text>
              <Text style={styles.courierLocation}>{task.to}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.courierBottom}>
            <Text style={styles.courierReward}>{task.reward}</Text>
            <Text style={styles.distanceText}>
              <FontAwesome5 name="map-marker-alt" size={10} color={COLORS.textSub} /> {task.distance}
            </Text>
            <TouchableOpacity style={styles.courierBtn}>
              <Text style={styles.courierBtnText}>Üstlen</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  </ScrollView>
);

const MapScreen = () => (
  <View style={styles.mapContainer}>
    <View style={styles.header}>
      <Text style={styles.pageTitle}>Canlı Harita</Text>
    </View>
    <View style={styles.mapPlaceholder}>
      {/* Istanbul Abstraction */}
      <View style={styles.bosphorus} />
      
      {/* Route Line (Dashed) */}
      <View style={styles.routeLine} />

      {/* Business Marker (Bizim Fırın) */}
      <View style={[styles.mapMarkerContainer, { top: '25%', left: '20%' }]}>
        <View style={styles.mapMarkerIcon}>
          <FontAwesome5 name="store" size={16} color={COLORS.primary} />
        </View>
        <View style={styles.mapMarkerDot} />
        <Text style={styles.mapMarkerLabel}>Bizim Fırın</Text>
      </View>

      {/* Person Marker (Ahmet Y.) */}
      <View style={[styles.mapMarkerContainer, { top: '65%', left: '45%' }]}>
        <View style={[styles.mapMarkerIcon, { borderColor: COLORS.danger }]}>
          <FontAwesome5 name="user" size={16} color={COLORS.danger} />
        </View>
        <View style={[styles.mapMarkerDot, { backgroundColor: COLORS.danger }]} />
        <Text style={styles.mapMarkerLabel}>Ahmet Y.</Text>
      </View>

      {/* Courier Marker */}
      <View style={[styles.mapMarkerContainer, { top: '45%', left: '32%', zIndex: 10 }]}>
        <View style={styles.courierIconWrap}>
          <FontAwesome5 name="motorcycle" size={14} color={COLORS.bg} />
        </View>
      </View>

      {/* Tracking Card */}
      <View style={styles.mapFloatingCard}>
         <View style={styles.trackingTop}>
           <View style={styles.trackingBadge}><Text style={styles.trackingBadgeText}>AKTİF TESLİMAT</Text></View>
           <Text style={styles.trackingTime}>10 dk kaldı</Text>
         </View>
         <View style={styles.trackingRoute}>
           <View style={styles.trackingTimeline}>
             <View style={styles.timelineDotStart} />
             <View style={styles.timelineLine} />
             <View style={styles.timelineDotEnd} />
           </View>
           <View style={styles.trackingLocations}>
             <View style={styles.trackingLocRow}>
               <Text style={styles.trackingLocText}>Bizim Fırın</Text>
               <Text style={styles.trackingLocSub}>Kadıköy</Text>
             </View>
             <View style={styles.trackingLocRow}>
               <Text style={styles.trackingLocText}>Ahmet Yılmaz</Text>
               <Text style={styles.trackingLocSub}>Üsküdar</Text>
             </View>
           </View>
         </View>
      </View>
    </View>
  </View>
);

const ProductDetailScreen = ({ product, onBack }) => (
  <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent}>
    <View style={styles.headerWithBack}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <FontAwesome5 name="arrow-left" size={20} color={COLORS.textMain} />
      </TouchableOpacity>
      <Text style={styles.pageTitle}>Ürün Detayı</Text>
      <View style={{ width: 40 }} />
    </View>
    {product && (
      <View style={styles.detailContainer}>
        <View style={styles.detailIconBox}>
          <FontAwesome5 name="box-open" size={40} color={COLORS.primary} />
        </View>
        <Text style={styles.detailProductName}>{product.product}</Text>
        <Text style={styles.detailBusinessName}>{product.name}</Text>
        
        <View style={styles.detailInfoBox}>
          <View style={styles.detailInfoRow}>
            <Text style={styles.detailInfoLabel}>Adet / Miktar:</Text>
            <Text style={styles.detailInfoValue}>1 Paket (Belirtilen)</Text>
          </View>
          <View style={styles.detailInfoRow}>
            <Text style={styles.detailInfoLabel}>Teslim Alma Süresi:</Text>
            <Text style={[styles.detailInfoValue, { color: COLORS.danger }]}>{product.time}</Text>
          </View>
          <View style={styles.detailInfoRow}>
            <Text style={styles.detailInfoLabel}>Mesafe:</Text>
            <Text style={styles.detailInfoValue}>
              <FontAwesome5 name="map-marker-alt" size={12} color={COLORS.primary} /> {product.distance}
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.detailActionBtn} 
          onPress={() => alert('Kurye ile eşleştirme talebi alındı. Yakındaki gönüllü kuryeler aranıyor...')}>
          <FontAwesome5 name="motorcycle" size={20} color={COLORS.bg} />
          <Text style={styles.detailActionBtnText}>Kurye ile Eşleştir</Text>
        </TouchableOpacity>
        <Text style={styles.detailHelpText}>
          Bu ürünü kendiniz teslim alamıyorsanız, gönüllü bir kurye ile eşleşerek ihtiyaç sahiplerine ulaştırılmasını sağlayabilirsiniz.
        </Text>
      </View>
    )}
  </ScrollView>
);

const DonateScreen = () => (
  <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent}>
    <View style={styles.header}>
      <Text style={styles.pageTitle}>Kumbaram</Text>
    </View>

    <View style={styles.donateHero}>
      <FontAwesome5 name="piggy-bank" size={40} color={COLORS.primary} style={{ marginBottom: 12 }} />
      <Text style={styles.donateLabel}>Toplam Bağışınız</Text>
      <Text style={styles.donateValue}>1,250 ₺</Text>
      <Text style={styles.donateImpact}>Bugüne kadar 25 kişiye yemek sağladınız! 🍲</Text>
      <View style={styles.levelBadge}>
        <Text style={styles.levelBadgeText}>Seviye: Kahraman 🌟</Text>
      </View>
    </View>

    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>Hızlı Bağış</Text>
    </View>
    
    <View style={styles.fastDonateContainer}>
      {[50, 100, 200, 500, 1000, 2000].map((amount) => (
        <TouchableOpacity key={amount} style={styles.fastDonateBtn}>
          <Text style={styles.fastDonateText}>{amount} ₺</Text>
        </TouchableOpacity>
      ))}
    </View>

    <View style={{ paddingHorizontal: 20, marginBottom: 8 }}>
      <TouchableOpacity style={styles.donateSubmitBtn}>
        <Text style={styles.donateSubmitBtnText}>Bağış Yap</Text>
      </TouchableOpacity>
    </View>

    <View style={[styles.sectionHeader, { marginTop: 16 }]}>
      <Text style={styles.sectionTitle}>Gıda Desteği Paketleri</Text>
    </View>
    
    <View style={{ paddingHorizontal: 20 }}>
      {/* Package 1 */}
      <View style={styles.foodPackCard}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <View style={[styles.foodIconBox, { backgroundColor: 'rgba(249, 115, 22, 0.1)' }]}>
            <FontAwesome5 name="utensils" size={20} color="#F97316" />
          </View>
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.foodPackTitle}>Sıcak Yemek</Text>
            <Text style={styles.foodPackSub}>1 Kişilik Günlük Öğün</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.foodPackBtn}>
          <Text style={styles.foodPackBtnText}>50 ₺</Text>
        </TouchableOpacity>
      </View>

      {/* Package 2 */}
      <View style={styles.foodPackCard}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <View style={[styles.foodIconBox, { backgroundColor: 'rgba(236, 72, 153, 0.1)' }]}>
            <FontAwesome5 name="baby" size={20} color="#EC4899" />
          </View>
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.foodPackTitle}>Bebek Maması</Text>
            <Text style={styles.foodPackSub}>1 Haftalık Destek</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.foodPackBtn}>
          <Text style={styles.foodPackBtnText}>150 ₺</Text>
        </TouchableOpacity>
      </View>

      {/* Package 3 */}
      <View style={styles.foodPackCard}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <View style={[styles.foodIconBox, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
            <FontAwesome5 name="box-open" size={20} color="#10B981" />
          </View>
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.foodPackTitle}>Aile Erzak Kolisi</Text>
            <Text style={styles.foodPackSub}>4 Kişilik Temel İhtiyaç</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.foodPackBtn}>
          <Text style={styles.foodPackBtnText}>500 ₺</Text>
        </TouchableOpacity>
      </View>
    </View>

  </ScrollView>
);

const ProfileScreen = () => (
  <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent}>
    <View style={styles.header}>
      <Text style={styles.pageTitle}>Profil</Text>
    </View>

    <View style={styles.profileHeader}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>B</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>Berke Yılmaz</Text>
        <Text style={styles.profileEmail}>berke@example.com</Text>
      </View>
    </View>

    <View style={styles.settingsList}>
      {['Hesap Bilgileri', 'Geçmiş Siparişler', 'Bildirim Ayarları', 'Yardım ve Destek'].map((item, index) => (
        <TouchableOpacity key={index} style={styles.settingsItem}>
          <Text style={styles.settingsItemText}>{item}</Text>
          <FontAwesome5 name="chevron-right" size={16} color={COLORS.textSub} />
        </TouchableOpacity>
      ))}
      
      <TouchableOpacity style={styles.logoutBtn}>
        <Text style={styles.logoutText}>Çıkış Yap</Text>
        <FontAwesome5 name="sign-out-alt" size={16} color={COLORS.danger} />
      </TouchableOpacity>
    </View>
  </ScrollView>
);

const NotificationsScreen = ({ onBack }) => (
  <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent}>
    <View style={styles.headerWithBack}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <FontAwesome5 name="arrow-left" size={20} color={COLORS.textMain} />
      </TouchableOpacity>
      <Text style={styles.pageTitle}>Bildirimler</Text>
      <View style={{ width: 40 }} />
    </View>
    <View style={{ paddingHorizontal: 20 }}>
      {NOTIFICATIONS_DATA.map(notif => (
        <View key={notif.id} style={[styles.notifCard, notif.unread && styles.notifCardUnread]}>
          <View style={[styles.notifIconBox, notif.unread ? { backgroundColor: 'rgba(221, 166, 58, 0.1)' } : { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
            <FontAwesome5 name="bell" size={16} color={notif.unread ? COLORS.primary : COLORS.textSub} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.notifTitle}>{notif.title}</Text>
            <Text style={styles.notifDesc}>{notif.desc}</Text>
            <Text style={styles.notifTime}>{notif.time}</Text>
          </View>
          {notif.unread && <View style={styles.notifDotInline} />}
        </View>
      ))}
    </View>
  </ScrollView>
);

const QrScreen = ({ onBack }) => (
  <View style={[styles.scrollArea, { paddingHorizontal: 20 }]}>
    <View style={styles.headerWithBack}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <FontAwesome5 name="arrow-left" size={20} color={COLORS.textMain} />
      </TouchableOpacity>
      <Text style={styles.pageTitle}>QR Kodum</Text>
      <View style={{ width: 40 }} />
    </View>

    <View style={{ alignItems: 'center', marginTop: 32 }}>
      <Text style={{ fontFamily: 'Urbanist_400Regular', fontSize: 14, color: COLORS.textSub, textAlign: 'center', marginBottom: 40, maxWidth: 260, lineHeight: 22 }}>
        Ürünleri teslim alırken veya teslim ederken işletmeye bu kodu gösterin.
      </Text>

      <View style={{ backgroundColor: COLORS.textMain, width: 260, height: 260, borderRadius: 32, justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
         <View style={{ width: '80%', height: '80%', borderWidth: 4, borderColor: COLORS.bg, padding: 8, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignContent: 'space-between' }}>
            {/* Fake QR blocks */}
            <View style={{ width: '28%', height: '28%', backgroundColor: COLORS.bg, borderTopLeftRadius: 8 }} />
            <View style={{ width: '28%', height: '28%', backgroundColor: COLORS.bg }} />
            <View style={{ width: '28%', height: '28%', backgroundColor: COLORS.bg, borderTopRightRadius: 8 }} />
            
            <View style={{ width: '28%', height: '28%', backgroundColor: COLORS.bg }} />
            <View style={{ width: '28%', height: '28%', backgroundColor: 'transparent' }} />
            <View style={{ width: '28%', height: '28%', backgroundColor: COLORS.bg }} />
            
            <View style={{ width: '28%', height: '28%', backgroundColor: COLORS.bg, borderBottomLeftRadius: 8 }} />
            <View style={{ width: '28%', height: '28%', backgroundColor: COLORS.bg }} />
            <View style={{ width: '28%', height: '28%', backgroundColor: COLORS.bg, borderBottomRightRadius: 8 }} />
            
            <View style={{ position: 'absolute', top: '50%', left: '50%', marginLeft: -24, marginTop: -24, width: 48, height: 48, backgroundColor: COLORS.textMain, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: COLORS.bg }}>
              <Text style={{ fontFamily: 'Urbanist_700Bold', fontSize: 8, color: COLORS.bg, textAlign: 'center', lineHeight: 10 }}>GIDA{'\n'}KÖPRÜSÜ</Text>
            </View>
         </View>
      </View>

      <View style={{ marginTop: 32, backgroundColor: 'rgba(221, 166, 58, 0.1)', paddingHorizontal: 24, paddingVertical: 8, borderRadius: 24, borderWidth: 1, borderColor: 'rgba(221, 166, 58, 0.2)' }}>
         <Text style={{ fontFamily: 'Urbanist_700Bold', fontSize: 14, color: COLORS.primary, letterSpacing: 1 }}>QR İLE TESLİM AL</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card, padding: 20, borderRadius: 16, marginTop: 32, width: '100%', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' }}>
        <View style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: 'rgba(221, 166, 58, 0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 16 }}>
          <FontAwesome5 name="qrcode" size={24} color={COLORS.primary} />
        </View>
        <View>
          <Text style={{ fontFamily: 'Urbanist_700Bold', fontSize: 16, color: COLORS.textMain, marginBottom: 4 }}>Berke Yılmaz</Text>
          <Text style={{ fontFamily: 'Urbanist_400Regular', fontSize: 14, color: COLORS.textSub }}>ID: 8492-4912-3042</Text>
        </View>
      </View>
    </View>
  </View>
);

const CartScreen = ({ onBack }) => (
  <ScrollView style={[styles.scrollArea, { paddingHorizontal: 20 }]} showsVerticalScrollIndicator={false}>
    <View style={styles.headerWithBack}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <FontAwesome5 name="arrow-left" size={20} color={COLORS.textMain} />
      </TouchableOpacity>
      <Text style={styles.pageTitle}>Sepetim</Text>
      <View style={{ width: 40 }} />
    </View>

    <Text style={{ fontFamily: 'Urbanist_700Bold', fontSize: 18, color: COLORS.textMain, marginTop: 24, marginBottom: 16 }}>Sepetteki Fırsatlar</Text>
    
    <View style={{ marginBottom: 32 }}>
      <View style={{ flexDirection: 'row', backgroundColor: COLORS.card, padding: 16, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', alignItems: 'center' }}>
        <View style={{ width: 4, backgroundColor: COLORS.primary, position: 'absolute', left: 0, top: 0, bottom: 0, borderTopLeftRadius: 16, borderBottomLeftRadius: 16 }} />
        <View style={{ width: 48, height: 48, backgroundColor: 'rgba(221, 166, 58, 0.1)', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginLeft: 8, marginRight: 16 }}>
          <FontAwesome5 name="box-open" size={20} color={COLORS.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: 'Urbanist_700Bold', fontSize: 14, color: COLORS.textMain, marginBottom: 4 }}>Starbucks</Text>
          <Text style={{ fontFamily: 'Urbanist_400Regular', fontSize: 12, color: COLORS.textSub }}>Akşam Fırın Ürünleri</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ fontFamily: 'Urbanist_400Regular', fontSize: 12, color: COLORS.textSub, textDecorationLine: 'line-through', marginBottom: 2 }}>200₺</Text>
          <Text style={{ fontFamily: 'Urbanist_700Bold', fontSize: 16, color: COLORS.textMain }}>70₺</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', backgroundColor: COLORS.card, padding: 16, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', alignItems: 'center' }}>
        <View style={{ width: 4, backgroundColor: COLORS.primary, position: 'absolute', left: 0, top: 0, bottom: 0, borderTopLeftRadius: 16, borderBottomLeftRadius: 16 }} />
        <View style={{ width: 48, height: 48, backgroundColor: 'rgba(221, 166, 58, 0.1)', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginLeft: 8, marginRight: 16 }}>
          <FontAwesome5 name="box-open" size={20} color={COLORS.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: 'Urbanist_700Bold', fontSize: 14, color: COLORS.textMain, marginBottom: 4 }}>Migros</Text>
          <Text style={{ fontFamily: 'Urbanist_400Regular', fontSize: 12, color: COLORS.textSub }}>Sebze Paketi (SKT Yakın)</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ fontFamily: 'Urbanist_400Regular', fontSize: 12, color: COLORS.textSub, textDecorationLine: 'line-through', marginBottom: 2 }}>150₺</Text>
          <Text style={{ fontFamily: 'Urbanist_700Bold', fontSize: 16, color: COLORS.textMain }}>50₺</Text>
        </View>
      </View>
    </View>

    <Text style={{ fontFamily: 'Urbanist_700Bold', fontSize: 18, color: COLORS.textMain, marginBottom: 16 }}>Kuponlar</Text>
    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card, padding: 16, borderRadius: 16, marginBottom: 32, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', borderStyle: 'dashed' }}>
      <FontAwesome5 name="tag" size={20} color={COLORS.primary} style={{ marginRight: 12 }} />
      <TextInput 
        placeholder="Kupon Kodu Girin"
        placeholderTextColor={COLORS.textSub}
        style={{ flex: 1, color: COLORS.textMain, fontFamily: 'Urbanist_600SemiBold', fontSize: 14 }}
      />
      <TouchableOpacity style={{ backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 }}>
        <Text style={{ fontFamily: 'Urbanist_700Bold', fontSize: 12, color: COLORS.textMain }}>Uygula</Text>
      </TouchableOpacity>
    </View>

    <View style={{ backgroundColor: COLORS.bg, padding: 24, borderRadius: 24, borderWidth: 1, borderColor: 'rgba(221, 166, 58, 0.3)', marginBottom: 40 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
        <Text style={{ fontFamily: 'Urbanist_400Regular', fontSize: 14, color: COLORS.textSub }}>Orijinal Toplam</Text>
        <Text style={{ fontFamily: 'Urbanist_400Regular', fontSize: 14, color: COLORS.textSub, textDecorationLine: 'line-through' }}>350₺</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FontAwesome5 name="leaf" size={14} color="#4ade80" style={{ marginRight: 8 }} />
          <Text style={{ fontFamily: 'Urbanist_600SemiBold', fontSize: 14, color: '#4ade80' }}>İsrafı Önleme İndirimi</Text>
        </View>
        <Text style={{ fontFamily: 'Urbanist_700Bold', fontSize: 14, color: '#4ade80' }}>-230₺ (%65)</Text>
      </View>
      <View style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginBottom: 16 }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Text style={{ fontFamily: 'Urbanist_700Bold', fontSize: 18, color: COLORS.textMain }}>Ödenecek Tutar</Text>
        <Text style={{ fontFamily: 'Urbanist_700Bold', fontSize: 24, color: COLORS.primary }}>120₺</Text>
      </View>
      <TouchableOpacity style={{ backgroundColor: COLORS.primary, paddingVertical: 16, borderRadius: 16, alignItems: 'center' }}>
        <Text style={{ fontFamily: 'Urbanist_700Bold', fontSize: 16, color: COLORS.bg }}>Sepeti Onayla</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [fontsLoaded] = useFonts({
    Urbanist_400Regular,
    Urbanist_600SemiBold,
    Urbanist_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'home': return <HomeScreen onNavigate={setActiveTab} onProductSelect={setSelectedProduct} />;
      case 'map': return <MapScreen />;
      case 'donate': return <DonateScreen />;
      case 'profile': return <ProfileScreen />;
      case 'deals': return <DealsScreen onBack={() => setActiveTab('home')} />;
      case 'courier': return <CourierScreen onBack={() => setActiveTab('home')} />;
      case 'pickup': return <PickupScreen onBack={() => setActiveTab('home')} />;
      case 'productDetail': return <ProductDetailScreen product={selectedProduct} onBack={() => setActiveTab('home')} />;
      case 'qr': return <QrScreen onBack={() => setActiveTab('home')} />;
      case 'cart': return <CartScreen onBack={() => setActiveTab('home')} />;
      case 'notifications': return <NotificationsScreen onBack={() => setActiveTab('home')} />;
      default: return <HomeScreen onNavigate={setActiveTab} onProductSelect={setSelectedProduct} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
      
      <View style={styles.contentContainer}>
        {renderScreen()}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('home')}>
          <FontAwesome5 name="home" size={20} color={activeTab === 'home' || activeTab === 'deals' || activeTab === 'courier' ? COLORS.primary : COLORS.textSub} />
          <Text style={[styles.navText, { color: activeTab === 'home' || activeTab === 'deals' || activeTab === 'courier' ? COLORS.primary : COLORS.textSub }]}>Ana Sayfa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('map')}>
          <FontAwesome5 name="map" size={20} color={activeTab === 'map' ? COLORS.primary : COLORS.textSub} />
          <Text style={[styles.navText, { color: activeTab === 'map' ? COLORS.primary : COLORS.textSub }]}>Harita</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('donate')}>
          <FontAwesome5 name="donate" size={20} color={activeTab === 'donate' ? COLORS.primary : COLORS.textSub} />
          <Text style={[styles.navText, { color: activeTab === 'donate' ? COLORS.primary : COLORS.textSub }]}>Kumbaram</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('profile')}>
          <FontAwesome5 name="user" size={20} color={activeTab === 'profile' ? COLORS.primary : COLORS.textSub} />
          <Text style={[styles.navText, { color: activeTab === 'profile' ? COLORS.primary : COLORS.textSub }]}>Profil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  contentContainer: { flex: 1 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20,
  },
  headerWithBack: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20,
  },
  backBtn: { padding: 10, marginLeft: -10 },
  greeting: { fontFamily: 'Urbanist_700Bold', fontSize: 24, color: COLORS.textMain },
  pageTitle: { fontFamily: 'Urbanist_700Bold', fontSize: 24, color: COLORS.textMain },
  bellButton: { position: 'relative', padding: 5 },
  notificationDot: {
    position: 'absolute', top: 4, right: 4, width: 10, height: 10,
    borderRadius: 5, backgroundColor: COLORS.primary, borderWidth: 2, borderColor: COLORS.bg,
  },
  scrollArea: { flex: 1 },
  scrollContent: { paddingBottom: 100 },
  heroCard: {
    backgroundColor: COLORS.card, marginHorizontal: 20, borderRadius: 16,
    borderWidth: 1, borderColor: COLORS.primary, padding: 20, marginBottom: 24,
  },
  heroRow: { flexDirection: 'row', alignItems: 'center' },
  heroIconContainer: {
    width: 48, height: 48, borderRadius: 12, backgroundColor: 'rgba(221, 166, 58, 0.1)',
    justifyContent: 'center', alignItems: 'center', marginRight: 16,
  },
  heroTextContainer: { flex: 1 },
  heroLabel: { fontFamily: 'Urbanist_400Regular', fontSize: 14, color: COLORS.textSub, marginBottom: 4 },
  heroValue: { fontFamily: 'Urbanist_700Bold', fontSize: 20, color: COLORS.textMain },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginVertical: 16 },
  actionsContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 30 },
  actionBtn: {
    backgroundColor: COLORS.card, width: '31%', aspectRatio: 1, borderRadius: 16,
    justifyContent: 'center', alignItems: 'center', padding: 10,
  },
  actionText: { fontFamily: 'Urbanist_600SemiBold', fontSize: 13, color: COLORS.textMain, marginTop: 12, textAlign: 'center' },
  actionTextSmall: { fontFamily: 'Urbanist_700Bold', fontSize: 11, color: COLORS.textMain, textAlign: 'center' },
  sectionHeader: { paddingHorizontal: 20, marginBottom: 16 },
  sectionTitle: { fontFamily: 'Urbanist_700Bold', fontSize: 18, color: COLORS.textMain },
  listContent: { paddingHorizontal: 20, paddingBottom: 16 },
  emergencyCard: {
    backgroundColor: COLORS.card, width: 280, borderRadius: 16, padding: 20, marginRight: 16,
    justifyContent: 'space-between', minHeight: 160
  },
  emergencyTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  businessName: { fontFamily: 'Urbanist_700Bold', fontSize: 16, color: COLORS.textMain, flex: 1, marginRight: 8 },
  badge: { backgroundColor: COLORS.dangerBg, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  badgeText: { fontFamily: 'Urbanist_600SemiBold', fontSize: 11, color: COLORS.danger },
  productInfo: { fontFamily: 'Urbanist_400Regular', fontSize: 14, color: COLORS.textSub, marginBottom: 16, lineHeight: 20 },
  emergencyBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' },
  distanceText: { fontFamily: 'Urbanist_600SemiBold', fontSize: 14, color: COLORS.textSub },
  buyBtn: { backgroundColor: COLORS.primary, paddingHorizontal: 24, paddingVertical: 10, borderRadius: 12 },
  buyBtnText: { fontFamily: 'Urbanist_700Bold', fontSize: 14, color: COLORS.bg },
  
  // Deals Screen
  dealCard: {
    backgroundColor: COLORS.card, padding: 16, borderRadius: 16, marginBottom: 12,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)'
  },
  dealName: { fontFamily: 'Urbanist_700Bold', fontSize: 16, color: COLORS.textMain },
  dealProduct: { fontFamily: 'Urbanist_400Regular', fontSize: 14, color: COLORS.textSub, marginTop: 4 },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  oldPrice: { fontFamily: 'Urbanist_400Regular', fontSize: 12, color: COLORS.textSub, textDecorationLine: 'line-through', marginRight: 8 },
  newPrice: { fontFamily: 'Urbanist_700Bold', fontSize: 18, color: COLORS.primary },
  dealBtn: { backgroundColor: COLORS.primary, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12 },
  dealBtnText: { fontFamily: 'Urbanist_700Bold', fontSize: 14, color: COLORS.bg },

  // Courier Screen
  courierCard: {
    backgroundColor: COLORS.card, padding: 16, borderRadius: 16, marginBottom: 12,
    borderWidth: 1, borderColor: 'rgba(221, 166, 58, 0.3)'
  },
  courierTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  courierLabel: { fontFamily: 'Urbanist_400Regular', fontSize: 12, color: COLORS.textSub, marginBottom: 2 },
  courierLocation: { fontFamily: 'Urbanist_700Bold', fontSize: 14, color: COLORS.textMain },
  courierBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  courierReward: { fontFamily: 'Urbanist_700Bold', fontSize: 14, color: COLORS.primary },
  courierBtn: { backgroundColor: COLORS.textMain, paddingHorizontal: 20, paddingVertical: 8, borderRadius: 12 },
  courierBtnText: { fontFamily: 'Urbanist_700Bold', fontSize: 14, color: COLORS.bg },

  // Map Screen
  mapContainer: { flex: 1 },
  mapPlaceholder: {
    flex: 1, backgroundColor: '#0F172A', margin: 16, borderRadius: 24,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', overflow: 'hidden', position: 'relative'
  },
  bosphorus: { position: 'absolute', width: 80, height: '150%', backgroundColor: '#1E40AF', opacity: 0.3, transform: [{ rotate: '-15deg' }], left: '30%', top: '-20%' },
  routeLine: { position: 'absolute', width: 160, height: 1, borderTopWidth: 2, borderStyle: 'dashed', borderColor: COLORS.primary, top: '45%', left: '15%', transform: [{ rotate: '58deg' }] },
  mapMarkerContainer: { position: 'absolute', alignItems: 'center', zIndex: 5 },
  mapMarkerIcon: { backgroundColor: COLORS.card, padding: 8, borderRadius: 12, borderWidth: 1, borderColor: COLORS.primary, marginBottom: 4, elevation: 5 },
  mapMarkerDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.primary },
  mapMarkerLabel: { fontFamily: 'Urbanist_700Bold', fontSize: 10, color: COLORS.textMain, marginTop: 4, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, overflow: 'hidden' },
  courierIconWrap: { backgroundColor: '#FFF', padding: 8, borderRadius: 16, elevation: 10, shadowColor: '#FFF', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 10 },
  
  mapFloatingCard: {
    position: 'absolute', bottom: 16, left: 16, right: 16, backgroundColor: 'rgba(17, 24, 39, 0.95)',
    padding: 20, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)'
  },
  trackingTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  trackingBadge: { backgroundColor: 'rgba(221, 166, 58, 0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  trackingBadgeText: { fontFamily: 'Urbanist_700Bold', fontSize: 10, color: COLORS.primary },
  trackingTime: { fontFamily: 'Urbanist_700Bold', fontSize: 14, color: COLORS.textMain },
  trackingRoute: { flexDirection: 'row', alignItems: 'center' },
  trackingTimeline: { alignItems: 'center', marginRight: 16 },
  timelineDotStart: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.primary },
  timelineLine: { width: 2, height: 28, backgroundColor: COLORS.textSub, marginVertical: 4 },
  timelineDotEnd: { width: 10, height: 10, borderRadius: 5, borderWidth: 2, borderColor: COLORS.danger, backgroundColor: COLORS.bg },
  trackingLocations: { flex: 1, justifyContent: 'space-between', height: 56 },
  trackingLocRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  trackingLocText: { fontFamily: 'Urbanist_700Bold', fontSize: 14, color: COLORS.textMain },
  trackingLocSub: { fontFamily: 'Urbanist_400Regular', fontSize: 12, color: COLORS.textSub },

  // Donate Screen
  donateHero: {
    backgroundColor: COLORS.card, marginHorizontal: 20, borderRadius: 24, padding: 24,
    alignItems: 'center', borderWidth: 1, borderColor: COLORS.primary, marginBottom: 24
  },
  donateLabel: { fontFamily: 'Urbanist_400Regular', fontSize: 14, color: COLORS.textSub, marginBottom: 4 },
  donateValue: { fontFamily: 'Urbanist_700Bold', fontSize: 36, color: COLORS.textMain, marginBottom: 8 },
  donateImpact: { fontFamily: 'Urbanist_600SemiBold', fontSize: 12, color: COLORS.primary, marginBottom: 16 },
  levelBadge: { backgroundColor: 'rgba(221, 166, 58, 0.1)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(221, 166, 58, 0.2)' },
  levelBadgeText: { fontFamily: 'Urbanist_700Bold', fontSize: 14, color: COLORS.primary },
  fastDonateContainer: { flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'space-between', flexWrap: 'wrap' },
  fastDonateBtn: {
    width: '31%', backgroundColor: COLORS.card, paddingVertical: 14, marginBottom: 12,
    borderRadius: 16, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)'
  },
  fastDonateText: { fontFamily: 'Urbanist_700Bold', fontSize: 14, color: COLORS.textMain },
  donateSubmitBtn: { backgroundColor: COLORS.primary, paddingVertical: 16, borderRadius: 16, alignItems: 'center' },
  donateSubmitBtnText: { fontFamily: 'Urbanist_700Bold', fontSize: 16, color: COLORS.bg },
  
  // Food Support Packages
  foodPackCard: { backgroundColor: COLORS.card, padding: 16, borderRadius: 16, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  foodIconBox: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  foodPackTitle: { fontFamily: 'Urbanist_700Bold', fontSize: 14, color: COLORS.textMain, marginBottom: 2 },
  foodPackSub: { fontFamily: 'Urbanist_400Regular', fontSize: 12, color: COLORS.textSub },
  foodPackBtn: { backgroundColor: COLORS.primary, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12 },
  foodPackBtnText: { fontFamily: 'Urbanist_700Bold', fontSize: 12, color: COLORS.bg },

  // Profile Screen
  profileHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 32 },
  avatar: {
    width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.primary,
    justifyContent: 'center', alignItems: 'center', marginRight: 16
  },
  avatarText: { fontFamily: 'Urbanist_700Bold', fontSize: 32, color: COLORS.bg },
  profileInfo: { flex: 1 },
  profileName: { fontFamily: 'Urbanist_700Bold', fontSize: 24, color: COLORS.textMain, marginBottom: 4 },
  profileEmail: { fontFamily: 'Urbanist_400Regular', fontSize: 14, color: COLORS.textSub },
  settingsList: { paddingHorizontal: 20 },
  settingsItem: {
    backgroundColor: COLORS.card, padding: 20, borderRadius: 16, marginBottom: 12,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
  },
  settingsItemText: { fontFamily: 'Urbanist_600SemiBold', fontSize: 16, color: COLORS.textMain },
  logoutBtn: {
    backgroundColor: COLORS.dangerBg, padding: 20, borderRadius: 16, marginTop: 20,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
  },
  logoutText: { fontFamily: 'Urbanist_700Bold', fontSize: 16, color: COLORS.danger },

  // Notifications Screen
  notifCard: { backgroundColor: COLORS.card, padding: 16, borderRadius: 16, marginBottom: 12, flexDirection: 'row', alignItems: 'flex-start', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  notifCardUnread: { borderColor: COLORS.primary },
  notifIconBox: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  notifTitle: { fontFamily: 'Urbanist_700Bold', fontSize: 14, color: COLORS.textMain, marginBottom: 4 },
  notifDesc: { fontFamily: 'Urbanist_400Regular', fontSize: 12, color: COLORS.textSub, marginBottom: 8, lineHeight: 18 },
  notifTime: { fontFamily: 'Urbanist_600SemiBold', fontSize: 10, color: COLORS.textSub },
  notifDotInline: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.primary, position: 'absolute', top: 16, right: 16 },

  // Product Detail Screen
  detailContainer: { backgroundColor: COLORS.card, padding: 20, borderRadius: 24, marginHorizontal: 20, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  detailIconBox: { width: 80, height: 80, borderRadius: 20, backgroundColor: 'rgba(221, 166, 58, 0.1)', justifyContent: 'center', alignItems: 'center', marginBottom: 16, borderWidth: 1, borderColor: 'rgba(221, 166, 58, 0.3)' },
  detailProductName: { fontFamily: 'Urbanist_700Bold', fontSize: 24, color: COLORS.textMain, marginBottom: 4, textAlign: 'center' },
  detailBusinessName: { fontFamily: 'Urbanist_700Bold', fontSize: 18, color: COLORS.primary, marginBottom: 24, textAlign: 'center' },
  detailInfoBox: { width: '100%', backgroundColor: COLORS.bg, borderRadius: 16, padding: 16, marginBottom: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  detailInfoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  detailInfoLabel: { fontFamily: 'Urbanist_400Regular', fontSize: 14, color: COLORS.textSub },
  detailInfoValue: { fontFamily: 'Urbanist_700Bold', fontSize: 14, color: COLORS.textMain },
  detailActionBtn: { width: '100%', backgroundColor: COLORS.primary, paddingVertical: 16, borderRadius: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
  detailActionBtnText: { fontFamily: 'Urbanist_700Bold', fontSize: 16, color: COLORS.bg, marginLeft: 8 },
  detailHelpText: { fontFamily: 'Urbanist_400Regular', fontSize: 12, color: COLORS.textSub, textAlign: 'center', marginTop: 16 },

  bottomNav: {
    position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row',
    backgroundColor: COLORS.card, paddingVertical: 12, paddingBottom: 24,
    borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)',
  },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  navText: { fontFamily: 'Urbanist_600SemiBold', fontSize: 10, marginTop: 6 },
});
`
