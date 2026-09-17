import React, { useState } from 'react';
import { Bell, Package, Tag, PiggyBank, Bike, Map as MapIcon, Home, User, MapPin, HandCoins, Check, Copy, Code2, ChevronRight, LogOut, ArrowLeft, ArrowRight, Smile, Store, Utensils, Baby, Box, Leaf, QrCode, ShoppingCart, Footprints, Flame, Gift } from 'lucide-react';
import { expoCode } from './ExpoAppCode';

const EMERGENCY_DATA = [
  { id: 1, name: 'Bizim Fırın', product: '10 Adet Simit & Poğaça', time: 'Son 2 saat', distance: '200m' },
  { id: 2, name: 'Yeşil Manav', product: 'Karışık Meyve Kutusu', time: 'Son 45 dk', distance: '500m' },
  { id: 3, name: 'Tatlıcı Ali', product: 'Kalan Sütlü Tatlılar', time: 'Son 1 saat', distance: '1.2km' }
];

const NEEDS_DATA = [
  { id: 1, name: 'Ahmet Yılmaz', title: 'Aile Gıda Paketi', location: 'Kadıköy', distance: '1.5km', urgency: 'Yüksek' },
  { id: 2, name: 'Ayşe Demir', title: 'Sıcak Yemek', location: 'Üsküdar', distance: '3km', urgency: 'Orta' },
  { id: 3, name: 'Mehmet Çelik', title: 'Bebek Maması', location: 'Beşiktaş', distance: '5km', urgency: 'Acil' }
];

const DEALS_DATA = [
  { id: 1, name: 'Migros', product: 'Sebze Paketi (SKT Yakın)', old: '150₺', new: '50₺' },
  { id: 2, name: 'Starbucks', product: 'Akşam Fırın Ürünleri', old: '200₺', new: '70₺' },
  { id: 3, name: 'Burger King', product: 'Gün Sonu Menüleri', old: '250₺', new: '100₺' },
  { id: 4, name: 'CarrefourSA', product: 'Temel Gıda Sepeti (SKT Yakın)', old: '300₺', new: '120₺' }
];

const COURIER_DATA = [
  { id: 1, from: 'Bizim Fırın', to: 'Ahmet (İhtiyaç)', reward: '50 Puan', distance: '2.5km' },
  { id: 2, from: 'Yeşil Manav', to: 'Aşevi', reward: '100 Puan', distance: '4km' },
  { id: 3, from: 'Tatlıcı Ali', to: 'Ayşe (İhtiyaç)', reward: '75 Puan', distance: '1.8km' }
];

const NOTIFICATIONS_DATA = [
  { id: 1, title: 'Kurye Yola Çıktı 🛵', desc: "Bizim Fırın'dan aldığınız ürün kuryede.", time: '10 dk önce', unread: true },
  { id: 2, title: 'Yeni Fırsat Yakala! 🏷️', desc: 'Migros sebze paketini %70 indirimle ekledi.', time: '1 saat önce', unread: true },
  { id: 3, title: 'Bağışınız Ulaştı 💖', desc: 'Ahmet Yılmaz ailesine destek oldunuz. Teşekkürler!', time: 'Dün', unread: false }
];

export default function App() {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(expoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="flex-1 overflow-y-auto px-6 pb-32 no-scrollbar">
            {/* Hero Card */}
            <div className="bg-[#1F2937] rounded-2xl border border-[#DDA63A] p-5 mb-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#DDA63A]/10 flex items-center justify-center mr-4">
                  <Package size={24} className="text-[#DDA63A]" />
                </div>
                <div>
                  <p className="text-[#9CA3AF] text-sm mb-1">Bugüne kadar kurtarılan gıda</p>
                  <p className="text-white text-xl font-bold tracking-tight">125 kg</p>
                </div>
              </div>
              <div className="h-px bg-white/10 w-full mb-4"></div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-xl bg-[#DDA63A]/10 flex items-center justify-center mr-4">
                  <Smile size={24} className="text-[#DDA63A]" />
                </div>
                <div>
                  <p className="text-[#9CA3AF] text-sm mb-1">Memnun İhtiyaç Sahibi</p>
                  <p className="text-white text-xl font-bold tracking-tight">1,250 Kişi</p>
                </div>
              </div>
              <div className="h-px bg-white/10 w-full my-4"></div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-xl bg-[#DDA63A]/10 flex items-center justify-center mr-4">
                  <Store size={24} className="text-[#DDA63A]" />
                </div>
                <div>
                  <p className="text-[#9CA3AF] text-sm mb-1">Platforma Üye İşletme</p>
                  <p className="text-white text-xl font-bold tracking-tight">85 İşletme</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-4 gap-2 mb-8">
              <button onClick={() => setActiveTab('deals')} className="bg-[#1F2937] aspect-square rounded-2xl flex flex-col items-center justify-center p-1 hover:bg-gray-700 transition-colors">
                <Tag size={24} className="text-[#DDA63A] mb-2" />
                <span className="text-white text-[11px] font-semibold text-center leading-tight">Fırsatlar</span>
              </button>
              <button onClick={() => setActiveTab('donate')} className="bg-[#1F2937] aspect-square rounded-2xl flex flex-col items-center justify-center p-1 hover:bg-gray-700 transition-colors">
                <PiggyBank size={24} className="text-[#DDA63A] mb-2" />
                <span className="text-white text-[11px] font-semibold text-center leading-tight">Kumbara</span>
              </button>
              <button onClick={() => setActiveTab('courier')} className="bg-[#1F2937] aspect-square rounded-2xl flex flex-col items-center justify-center p-1 hover:bg-gray-700 transition-colors">
                <Bike size={24} className="text-[#DDA63A] mb-2" />
                <span className="text-white text-[11px] font-semibold text-center leading-tight">Kurye Ol</span>
              </button>
              <button onClick={() => setActiveTab('pickup')} className="bg-[#1F2937] aspect-square rounded-2xl flex flex-col items-center justify-center p-1 hover:bg-gray-700 transition-colors">
                <Footprints size={24} className="text-[#DDA63A] mb-2" />
                <span className="text-white text-[11px] font-semibold text-center leading-tight">Gel Al</span>
              </button>
            </div>

            {/* Nearby Businesses */}
            <h2 className="text-white text-[18px] font-bold mb-4">Kurtarılmayı Bekleyen Ürünler</h2>
            <div className="flex overflow-x-auto gap-4 pb-4 -mx-6 px-6 no-scrollbar snap-x snap-mandatory">
              {EMERGENCY_DATA.map(item => (
                <div key={item.id} className="bg-[#1F2937] w-[85vw] max-w-[280px] shrink-0 rounded-2xl p-5 snap-center border border-white/5 flex flex-col justify-between min-h-[160px]">
                  <div>
                    <div className="flex justify-between items-start mb-3 gap-2">
                      <h3 className="text-white font-bold text-base truncate">{item.name}</h3>
                      <span className="bg-red-500/15 text-red-500 text-[11px] font-semibold px-2.5 py-1 rounded-lg whitespace-nowrap shrink-0">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-[#9CA3AF] text-sm mb-4 line-clamp-2 leading-snug">{item.product}</p>
                  </div>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-[#9CA3AF] text-sm flex items-center gap-1 font-medium">
                      <MapPin size={14} /> {item.distance}
                    </span>
                    <button 
                      onClick={() => { setSelectedProduct(item); setActiveTab('productDetail'); }}
                      className="bg-[#DDA63A] text-[#111827] font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-yellow-500 transition-colors">
                      Al
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* People in Need */}
            <h2 className="text-white text-[18px] font-bold mb-4 mt-6">İhtiyaç Sahipleri</h2>
            <div className="flex overflow-x-auto gap-4 pb-4 -mx-6 px-6 no-scrollbar snap-x snap-mandatory">
              {NEEDS_DATA.map(item => (
                <div key={item.id} className="bg-[#1F2937] w-[85vw] max-w-[280px] shrink-0 rounded-2xl p-5 snap-center border border-white/5 flex flex-col justify-between min-h-[160px]">
                  <div>
                    <div className="flex justify-between items-start mb-3 gap-2">
                      <h3 className="text-white font-bold text-base truncate">{item.name}</h3>
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg whitespace-nowrap shrink-0 ${item.urgency === 'Acil' ? 'bg-red-500/15 text-red-500' : 'bg-[#DDA63A]/15 text-[#DDA63A]'}`}>
                        {item.urgency}
                      </span>
                    </div>
                    <p className="text-[#9CA3AF] text-sm mb-4 line-clamp-2 leading-snug">{item.title}<br/>{item.location}</p>
                  </div>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-[#9CA3AF] text-sm flex items-center gap-1 font-medium">
                      <MapPin size={14} /> {item.distance}
                    </span>
                    <button 
                      onClick={() => setActiveTab('donate')}
                      className="bg-white/10 text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-white/20 transition-colors">
                      Destek Ol
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        );
      case 'notifications':
        return (
          <div className="flex-1 overflow-y-auto px-6 pb-32 no-scrollbar">
            <div className="flex items-center gap-4 mb-6">
              <button onClick={() => setActiveTab('home')} className="text-white hover:bg-white/10 p-2 rounded-full -ml-2 transition-colors">
                <ArrowLeft size={24} />
              </button>
              <h2 className="text-white text-2xl font-bold">Bildirimler</h2>
            </div>
            <div className="space-y-3">
              {NOTIFICATIONS_DATA.map(notif => (
                <div key={notif.id} className={`bg-[#1F2937] p-4 rounded-2xl border ${notif.unread ? 'border-[#DDA63A]' : 'border-white/5'} flex gap-4 items-start relative`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${notif.unread ? 'bg-[#DDA63A]/10 text-[#DDA63A]' : 'bg-white/5 text-[#9CA3AF]'}`}>
                    <Bell size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm mb-1">{notif.title}</h3>
                    <p className="text-[#9CA3AF] text-xs mb-2 leading-relaxed">{notif.desc}</p>
                    <span className="text-[#9CA3AF] text-[10px] font-semibold">{notif.time}</span>
                  </div>
                  {notif.unread && <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#DDA63A]"></div>}
                </div>
              ))}
            </div>
          </div>
        );
      case 'productDetail':
        return (
          <div className="flex-1 overflow-y-auto px-6 pb-32 no-scrollbar">
            <div className="flex items-center gap-4 mb-6">
              <button onClick={() => setActiveTab('home')} className="text-white hover:bg-white/10 p-2 rounded-full -ml-2 transition-colors">
                <ArrowLeft size={24} />
              </button>
              <h2 className="text-white text-xl font-bold truncate">Ürün Detayı</h2>
            </div>
            {selectedProduct && (
              <div className="bg-[#1F2937] p-5 rounded-2xl border border-white/10 flex flex-col items-center">
                <div className="w-20 h-20 rounded-2xl bg-[#DDA63A]/10 flex items-center justify-center mb-4 border border-[#DDA63A]/30">
                  <Package size={40} className="text-[#DDA63A]" />
                </div>
                <h2 className="text-white text-2xl font-bold mb-1 text-center">{selectedProduct.product}</h2>
                <p className="text-[#DDA63A] font-bold text-lg mb-6 text-center">{selectedProduct.name}</p>
                
                <div className="w-full bg-[#111827] rounded-xl p-4 mb-6 border border-white/5 space-y-4">
                  <div className="flex justify-between items-center">
                     <span className="text-[#9CA3AF] text-sm">Adet / Miktar:</span>
                     <span className="text-white font-bold text-sm">1 Paket (Belirtilen)</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-[#9CA3AF] text-sm">Teslim Alma Süresi:</span>
                     <span className="text-red-400 font-bold text-sm">{selectedProduct.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-[#9CA3AF] text-sm">Mesafe:</span>
                     <span className="text-white font-bold text-sm flex items-center gap-1"><MapPin size={14} className="text-[#DDA63A]" /> {selectedProduct.distance}</span>
                  </div>
                </div>

                <button 
                  onClick={() => alert("Kurye ile eşleştirme talebi alındı. Yakındaki gönüllü kuryeler aranıyor...")}
                  className="w-full bg-[#DDA63A] text-[#111827] py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 hover:bg-yellow-500 transition-colors">
                  <Bike size={20} />
                  Kurye ile Eşleştir
                </button>
                <p className="text-[#9CA3AF] text-xs text-center mt-4">
                  Bu ürünü kendiniz teslim alamıyorsanız, gönüllü bir kurye ile eşleşerek ihtiyaç sahiplerine ulaştırılmasını sağlayabilirsiniz.
                </p>
              </div>
            )}
          </div>
        );
      case 'cart':
        return (
          <div className="flex-1 overflow-y-auto px-6 pb-32 no-scrollbar">
            <div className="flex items-center gap-4 mb-6">
              <button onClick={() => setActiveTab('home')} className="text-white hover:bg-white/10 p-2 rounded-full -ml-2 transition-colors">
                <ArrowLeft size={24} />
              </button>
              <h2 className="text-white text-2xl font-bold">Sepetim</h2>
            </div>
            
            <div className="mb-8">
              <h3 className="text-white text-lg font-bold mb-4">Sepetteki Fırsatlar</h3>
              <div className="space-y-3">
                {/* Cart Items */}
                <div className="bg-[#1F2937] p-4 rounded-2xl border border-white/5 flex gap-4 items-center relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#DDA63A]"></div>
                  <div className="w-12 h-12 bg-[#DDA63A]/10 rounded-xl flex items-center justify-center shrink-0">
                    <Package size={24} className="text-[#DDA63A]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-bold text-sm">Starbucks</h4>
                    <p className="text-[#9CA3AF] text-xs">Akşam Fırın Ürünleri</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500 line-through text-[10px]">200₺</p>
                    <p className="text-white font-bold text-base">70₺</p>
                  </div>
                </div>

                <div className="bg-[#1F2937] p-4 rounded-2xl border border-white/5 flex gap-4 items-center relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#DDA63A]"></div>
                  <div className="w-12 h-12 bg-[#DDA63A]/10 rounded-xl flex items-center justify-center shrink-0">
                    <Package size={24} className="text-[#DDA63A]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-bold text-sm">Migros</h4>
                    <p className="text-[#9CA3AF] text-xs">Sebze Paketi (SKT Yakın)</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500 line-through text-[10px]">150₺</p>
                    <p className="text-white font-bold text-base">50₺</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-white text-lg font-bold mb-4">Kuponlar</h3>
              <div className="bg-[#1F2937] p-4 rounded-2xl border border-white/5 flex items-center justify-between border-dashed">
                <div className="flex items-center gap-3">
                  <Tag size={20} className="text-[#DDA63A]" />
                  <input 
                    type="text" 
                    placeholder="Kupon Kodu Girin" 
                    className="bg-transparent text-white text-sm outline-none placeholder:text-gray-500 w-32"
                  />
                </div>
                <button className="bg-white/10 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-white/20 transition-colors">
                  Uygula
                </button>
              </div>
            </div>

            <div className="bg-[#111827] p-5 rounded-3xl border border-[#DDA63A]/30">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[#9CA3AF] text-sm">Orijinal Toplam</span>
                <span className="text-[#9CA3AF] text-sm line-through">350₺</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-green-400 text-sm font-semibold flex items-center gap-1">
                  <Leaf size={14} /> İsrafı Önleme İndirimi
                </span>
                <span className="text-green-400 text-sm font-bold">-230₺ (%65)</span>
              </div>
              <div className="h-px bg-white/10 w-full mb-4"></div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-white font-bold text-lg">Ödenecek Tutar</span>
                <span className="text-[#DDA63A] font-black text-2xl">120₺</span>
              </div>
              <button 
                onClick={() => alert("Siparişiniz onaylandı. QR kodunuz ile teslim alabilirsiniz!")}
                className="w-full bg-[#DDA63A] text-[#111827] py-4 rounded-xl font-bold text-base hover:bg-yellow-500 transition-colors">
                Sepeti Onayla
              </button>
            </div>

          </div>
        );
      case 'qr':
        return (
          <div className="flex-1 overflow-y-auto px-6 pb-32 no-scrollbar">
            <div className="flex items-center gap-4 mb-6">
              <button onClick={() => setActiveTab('home')} className="text-white hover:bg-white/10 p-2 rounded-full -ml-2 transition-colors">
                <ArrowLeft size={24} />
              </button>
              <h2 className="text-white text-2xl font-bold">QR Kodum</h2>
            </div>
            
            <div className="flex flex-col items-center mt-8">
              <p className="text-[#9CA3AF] text-sm text-center mb-10 max-w-[260px] leading-relaxed">
                Ürünleri teslim alırken veya teslim ederken işletmeye bu kodu gösterin.
              </p>
              
              <div className="bg-white w-[260px] h-[260px] rounded-[2rem] flex items-center justify-center relative shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                 <div className="w-[80%] h-[80%] border-4 border-black p-2 flex flex-wrap justify-between align-content-between">
                    <div className="w-[28%] h-[28%] bg-black rounded-tl-lg" />
                    <div className="w-[28%] h-[28%] bg-black" />
                    <div className="w-[28%] h-[28%] bg-black rounded-tr-lg" />
                    
                    <div className="w-[28%] h-[28%] bg-black" />
                    <div className="w-[28%] h-[28%] bg-transparent" />
                    <div className="w-[28%] h-[28%] bg-black" />
                    
                    <div className="w-[28%] h-[28%] bg-black rounded-bl-lg" />
                    <div className="w-[28%] h-[28%] bg-black" />
                    <div className="w-[28%] h-[28%] bg-black rounded-br-lg" />
                    
                    <div className="absolute top-1/2 left-1/2 -ml-6 -mt-6 w-12 h-12 bg-white flex items-center justify-center border-4 border-white">
                      <span className="font-['Urbanist'] font-black text-[10px] text-black text-center leading-3">GIDA<br/>KÖPRÜSÜ</span>
                    </div>
                 </div>
              </div>

              <div className="mt-8 text-center bg-[#DDA63A]/10 text-[#DDA63A] px-6 py-2 rounded-full font-bold text-sm tracking-wide border border-[#DDA63A]/20">
                QR İLE TESLİM AL
              </div>

              <div className="flex items-center bg-[#1F2937] p-5 rounded-2xl mt-8 w-full border border-white/5">
                <div className="w-12 h-12 rounded-xl bg-[#DDA63A]/10 flex items-center justify-center mr-4">
                  <QrCode size={24} className="text-[#DDA63A]" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base mb-1">Berke Yılmaz</h3>
                  <p className="text-[#9CA3AF] text-sm">ID: 8492-4912-3042</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'pickup':
        return (
          <div className="flex-1 overflow-y-auto px-6 pb-32 no-scrollbar">
            <div className="flex items-center gap-4 mb-6">
              <button onClick={() => setActiveTab('home')} className="text-white hover:bg-white/10 p-2 rounded-full -ml-2 transition-colors">
                <ArrowLeft size={24} />
              </button>
              <h2 className="text-white text-2xl font-bold">Gel Al Teslimat</h2>
            </div>

            <div className="bg-[#1F2937] p-5 rounded-2xl border border-white/5 mb-8">
               <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                 <MapPin size={18} className="text-[#DDA63A]" /> Teslimat Rotası
               </h3>
               
               <div className="flex justify-between items-center bg-[#111827] p-4 rounded-xl border border-white/5">
                  <div className="flex flex-col">
                     <span className="text-[#9CA3AF] text-xs mb-1">Hedef İşletme</span>
                     <span className="text-white font-bold text-base">Bizim Fırın</span>
                  </div>
                  <Footprints className="text-[#DDA63A]" size={28} />
                  <div className="flex flex-col text-right">
                     <span className="text-[#9CA3AF] text-xs mb-1">Kalan Mesafe</span>
                     <span className="text-white font-bold text-base">1.2 km</span>
                  </div>
               </div>
            </div>

            <h3 className="text-white text-lg font-bold mb-4">Sağlık Verilerin (Yürüyüş)</h3>
            <div className="grid grid-cols-2 gap-3 mb-8">
               <div className="bg-[#1F2937] p-5 rounded-2xl border border-white/5 flex flex-col items-center justify-center">
                 <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mb-3">
                   <Footprints size={24} className="text-emerald-400" />
                 </div>
                 <p className="text-white font-black text-2xl mb-1">1,452</p>
                 <p className="text-[#9CA3AF] text-xs font-semibold">Adım Atıldı</p>
               </div>
               <div className="bg-[#1F2937] p-5 rounded-2xl border border-white/5 flex flex-col items-center justify-center">
                 <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center mb-3">
                   <Flame size={24} className="text-orange-400" />
                 </div>
                 <p className="text-white font-black text-2xl mb-1">85</p>
                 <p className="text-[#9CA3AF] text-xs font-semibold">Kcal Yakıldı</p>
               </div>
            </div>

            <h3 className="text-white text-lg font-bold mb-4">Ekstra Ödül 🎁</h3>
            <div className="bg-gradient-to-r from-[#DDA63A]/20 to-transparent p-5 rounded-2xl border border-[#DDA63A]/30 flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-[#DDA63A]/20 rounded-full flex items-center justify-center shrink-0">
                <Gift size={28} className="text-[#DDA63A]" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-1">Doğa Dostu Teslimat!</h4>
                <p className="text-[#9CA3AF] text-xs mb-3 leading-relaxed">Yürüyerek teslim aldığın için karbon salınımını önledin ve kupon kazandın.</p>
                <div className="inline-block bg-[#DDA63A] text-[#111827] px-3 py-1.5 rounded-lg text-xs font-black tracking-wider">
                  DOGA15 - %15 İNDİRİM
                </div>
              </div>
            </div>
          </div>
        );
      case 'deals':
        return (
          <div className="flex-1 overflow-y-auto px-6 pb-32 no-scrollbar">
            <div className="flex items-center gap-4 mb-6">
              <button onClick={() => setActiveTab('home')} className="text-white hover:bg-white/10 p-2 rounded-full -ml-2 transition-colors">
                <ArrowLeft size={24} />
              </button>
              <h2 className="text-white text-2xl font-bold">Fırsatlar</h2>
            </div>
            <div className="space-y-3">
              {DEALS_DATA.map(deal => (
                <div key={deal.id} className="bg-[#1F2937] p-4 rounded-2xl flex justify-between items-center border border-white/5">
                  <div>
                    <h3 className="text-white font-bold">{deal.name}</h3>
                    <p className="text-[#9CA3AF] text-sm mt-1">{deal.product}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-gray-500 line-through text-xs">{deal.old}</span>
                      <span className="text-[#DDA63A] font-bold text-lg">{deal.new}</span>
                    </div>
                  </div>
                  <button className="bg-[#DDA63A] text-[#111827] px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-yellow-500 transition-colors">
                    Kap
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'courier':
        return (
          <div className="flex-1 overflow-y-auto px-6 pb-32 no-scrollbar">
            <div className="flex items-center gap-4 mb-6">
              <button onClick={() => setActiveTab('home')} className="text-white hover:bg-white/10 p-2 rounded-full -ml-2 transition-colors">
                <ArrowLeft size={24} />
              </button>
              <h2 className="text-white text-2xl font-bold">Gönüllü Kurye</h2>
            </div>
            <div className="space-y-3">
              {COURIER_DATA.map(task => (
                <div key={task.id} className="bg-[#1F2937] p-4 rounded-2xl border border-[#DDA63A]/30">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex flex-col">
                      <span className="text-[#9CA3AF] text-xs mb-1">Alış:</span>
                      <span className="text-white font-bold text-sm">{task.from}</span>
                    </div>
                    <ArrowRight size={16} className="text-[#DDA63A] mt-4 mx-2 shrink-0" />
                    <div className="flex flex-col text-right">
                      <span className="text-[#9CA3AF] text-xs mb-1">Teslimat:</span>
                      <span className="text-white font-bold text-sm">{task.to}</span>
                    </div>
                  </div>
                  <div className="h-px bg-white/10 my-4" />
                  <div className="flex justify-between items-center">
                    <span className="text-[#DDA63A] font-bold text-sm">{task.reward}</span>
                    <span className="text-[#9CA3AF] text-xs flex items-center gap-1">
                      <MapPin size={12}/> {task.distance}
                    </span>
                    <button className="bg-white text-[#111827] px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors">
                      Üstlen
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'map':
        return (
          <div className="flex-1 flex flex-col h-full relative pb-20">
            <h2 className="text-white text-2xl font-bold px-6 pb-2">Canlı Harita</h2>
            <div className="flex-1 bg-[#0F172A] mx-6 mb-6 rounded-[2rem] border border-white/5 relative overflow-hidden flex flex-col shadow-inner">
              
              {/* Istanbul Abstraction: Bosphorus & Route */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <path d="M 80,-20 C 120,100 220,150 180,450" stroke="#1E40AF" strokeWidth="40" fill="none" opacity="0.4" />
                <path d="M 100,160 Q 180,240 130,310" stroke="#DDA63A" strokeWidth="2" strokeDasharray="6,6" fill="none" className="opacity-80" />
              </svg>

              {/* Grid Pattern */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

              {/* Business Marker (Bizim Fırın - Kadıköy area) */}
              <div className="absolute top-[130px] left-[70px] flex flex-col items-center">
                <div className="bg-[#1F2937] p-2.5 rounded-xl border border-[#DDA63A] mb-1 z-10 shadow-lg">
                  <Store size={18} className="text-[#DDA63A]" />
                </div>
                <div className="bg-[#DDA63A] w-2.5 h-2.5 rounded-full shadow-[0_0_10px_#DDA63A]"></div>
                <span className="text-white text-[10px] font-bold mt-1 drop-shadow-md bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">Bizim Fırın</span>
              </div>

              {/* Person Marker (Ahmet Y. - Üsküdar area) */}
              <div className="absolute top-[290px] left-[110px] flex flex-col items-center">
                <div className="bg-[#1F2937] p-2.5 rounded-xl border border-red-400 mb-1 z-10 shadow-lg">
                  <User size={18} className="text-red-400" />
                </div>
                <div className="bg-red-400 w-2.5 h-2.5 rounded-full shadow-[0_0_10px_rgba(248,113,113,1)]"></div>
                <span className="text-white text-[10px] font-bold mt-1 drop-shadow-md bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">Ahmet Y.</span>
              </div>

              {/* Courier (Animated) */}
              <div className="absolute top-[210px] left-[140px] flex flex-col items-center animate-pulse z-20 transition-all duration-1000">
                <div className="bg-white p-2 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.6)]">
                  <Bike size={16} className="text-[#111827]" />
                </div>
              </div>

              {/* Tracking Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#111827]/90 backdrop-blur-md p-5 rounded-2xl border border-white/10 flex flex-col shadow-2xl z-30">
                 <div className="flex justify-between items-center mb-4">
                   <span className="bg-[#DDA63A]/20 text-[#DDA63A] text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider">Aktif Teslimat</span>
                   <span className="text-white text-sm font-bold">10 dk kaldı</span>
                 </div>
                 <div className="flex items-center gap-4">
                   <div className="flex flex-col items-center">
                     <div className="w-2.5 h-2.5 rounded-full bg-[#DDA63A]"></div>
                     <div className="w-0.5 h-7 bg-gray-600 my-1"></div>
                     <div className="w-2.5 h-2.5 rounded-full border-2 border-red-400 bg-[#111827]"></div>
                   </div>
                   <div className="flex flex-col justify-between h-14 w-full">
                     <div className="flex justify-between items-center">
                        <span className="text-white text-sm font-bold">Bizim Fırın</span>
                        <span className="text-[#9CA3AF] text-xs">Kadıköy</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-white text-sm font-bold">Ahmet Yılmaz</span>
                        <span className="text-[#9CA3AF] text-xs">Üsküdar</span>
                     </div>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        );
      case 'donate':
        return (
          <div className="flex-1 overflow-y-auto px-6 pb-32 no-scrollbar">
            <h2 className="text-white text-2xl font-bold mb-6">Kumbaram</h2>
            
            <div className="bg-[#1F2937] rounded-[1.5rem] border border-[#DDA63A] p-6 mb-8 text-center flex flex-col items-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#DDA63A]/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
              
              <PiggyBank size={48} className="text-[#DDA63A] mb-3" />
              <p className="text-[#9CA3AF] text-sm mb-1">Toplam Bağışınız</p>
              <p className="text-white text-4xl font-bold tracking-tight mb-2">1,250 ₺</p>
              <p className="text-[#DDA63A] text-xs font-semibold mb-4">Bugüne kadar 25 kişiye yemek sağladınız! 🍲</p>
              
              <div className="bg-[#DDA63A]/10 text-[#DDA63A] px-5 py-2 rounded-full text-sm font-bold border border-[#DDA63A]/20">
                Seviye: Kahraman 🌟
              </div>
            </div>

            <h3 className="text-white text-lg font-bold mb-4">Hızlı Bağış</h3>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[50, 100, 200, 500, 1000, 2000].map(amount => (
                <button key={amount} className="bg-[#1F2937] py-3.5 rounded-2xl border border-white/5 text-white font-bold hover:border-[#DDA63A] hover:bg-[#DDA63A]/5 transition-all text-sm">
                  {amount} ₺
                </button>
              ))}
            </div>
            
            <button className="w-full bg-[#DDA63A] text-[#111827] py-4 rounded-xl font-bold text-base hover:bg-yellow-500 transition-colors mb-8">
              Bağış Yap
            </button>

            <h3 className="text-white text-lg font-bold mb-4">Gıda Desteği Paketleri</h3>
            <div className="space-y-3">
              <div className="bg-[#1F2937] p-4 rounded-2xl border border-white/5 flex items-center justify-between hover:border-white/10 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center shrink-0">
                    <Utensils size={24} className="text-orange-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Sıcak Yemek</h4>
                    <p className="text-[#9CA3AF] text-xs mt-0.5">1 Kişilik Günlük Öğün</p>
                  </div>
                </div>
                <button className="bg-[#DDA63A] text-[#111827] px-4 py-2 rounded-xl text-xs font-bold hover:bg-yellow-500 shrink-0">
                  50 ₺
                </button>
              </div>

              <div className="bg-[#1F2937] p-4 rounded-2xl border border-white/5 flex items-center justify-between hover:border-white/10 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center shrink-0">
                    <Baby size={24} className="text-pink-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Bebek Maması</h4>
                    <p className="text-[#9CA3AF] text-xs mt-0.5">1 Haftalık Destek</p>
                  </div>
                </div>
                <button className="bg-[#DDA63A] text-[#111827] px-4 py-2 rounded-xl text-xs font-bold hover:bg-yellow-500 shrink-0">
                  150 ₺
                </button>
              </div>

              <div className="bg-[#1F2937] p-4 rounded-2xl border border-white/5 flex items-center justify-between hover:border-white/10 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center shrink-0">
                    <Box size={24} className="text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Aile Erzak Kolisi</h4>
                    <p className="text-[#9CA3AF] text-xs mt-0.5">4 Kişilik Temel İhtiyaç</p>
                  </div>
                </div>
                <button className="bg-[#DDA63A] text-[#111827] px-4 py-2 rounded-xl text-xs font-bold hover:bg-yellow-500 shrink-0">
                  500 ₺
                </button>
              </div>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="flex-1 overflow-y-auto px-6 pb-32 no-scrollbar">
            <h2 className="text-white text-2xl font-bold mb-8">Profil</h2>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-20 h-20 bg-[#DDA63A] rounded-full flex items-center justify-center text-[#111827] text-3xl font-bold">
                B
              </div>
              <div>
                <h2 className="text-white text-2xl font-bold mb-1">Berke Yılmaz</h2>
                <p className="text-[#9CA3AF] text-sm">berke@example.com</p>
              </div>
            </div>

            <div className="space-y-3">
              {['Hesap Bilgileri', 'Geçmiş Siparişler', 'Bildirim Ayarları', 'Yardım ve Destek'].map((item, idx) => (
                <button key={idx} className="w-full bg-[#1F2937] p-5 rounded-2xl flex justify-between items-center text-white hover:bg-gray-700 transition-colors">
                  <span className="font-semibold">{item}</span>
                  <ChevronRight size={18} className="text-[#9CA3AF]" />
                </button>
              ))}
              
              <button className="w-full bg-red-500/10 p-5 rounded-2xl flex justify-between items-center text-red-500 mt-6 hover:bg-red-500/20 transition-colors">
                <span className="font-bold text-base">Çıkış Yap</span>
                <LogOut size={18} />
              </button>
            </div>
          </div>
        );
    }
  };

  const isHomeOrSub = ['home', 'deals', 'courier'].includes(activeTab);

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 md:p-8 font-['Urbanist']">
      
      {/* Mobile Device Simulator Frame */}
      <div className="w-full max-w-[390px] h-[844px] max-h-[90vh] bg-[#111827] rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden relative border-[8px] border-gray-900 flex flex-col ring-1 ring-gray-800">
        
        {/* Top Status Bar Simulator (Optional notch) */}
        <div className="h-10 w-full flex justify-center items-center shrink-0">
          <div className="w-1/3 h-5 bg-black rounded-full mb-1"></div>
        </div>

        {/* Header (Only on Home) */}
        {activeTab === 'home' && (
          <div className="flex justify-between items-start px-6 py-4 shrink-0 mt-2">
            <div className="flex flex-col">
              <h1 className="text-3xl font-black tracking-tighter leading-none">
                <span className="text-white">Gıda</span><span className="text-[#DDA63A]">Köprüsü</span>
              </h1>
              <p className="text-[#9CA3AF] text-[11px] font-semibold mt-1 tracking-wider uppercase">İsrafı Önle, Hayata Bağla.</p>
              <h2 className="text-white text-[22px] font-bold mt-6">Hoş geldin, Berke 👋</h2>
            </div>
            <div className="flex flex-col items-end gap-3 -mt-1">
              <div className="flex gap-2">
                <button onClick={() => setActiveTab('cart')} className="relative p-2 text-white hover:bg-white/10 rounded-full transition-colors">
                  <ShoppingCart size={24} />
                  <span className="absolute top-1 right-2 w-3 h-3 bg-[#DDA63A] rounded-full border-2 border-[#111827]"></span>
                </button>
                <button onClick={() => setActiveTab('notifications')} className="relative p-2 text-white hover:bg-white/10 rounded-full transition-colors">
                  <Bell size={24} />
                  <span className="absolute top-1 right-2 w-3 h-3 bg-[#DDA63A] rounded-full border-2 border-[#111827]"></span>
                </button>
              </div>
              <button onClick={() => setActiveTab('qr')} className="p-2 text-white hover:bg-white/10 rounded-full transition-colors">
                <QrCode size={24} />
              </button>
            </div>
          </div>
        )}
        
        {/* Adds padding when not on home */}
        {activeTab !== 'home' && <div className="h-4 w-full shrink-0"></div>}

        {/* Rendered View */}
        {renderScreen()}

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#1F2937] border-t border-white/5 pb-8 pt-4 px-6 flex justify-between items-center z-10">
          <button onClick={() => setActiveTab('home')} className="flex flex-col items-center gap-1.5 flex-1 group">
            <Home size={22} className={`transition-colors ${isHomeOrSub ? 'text-[#DDA63A]' : 'text-[#9CA3AF] group-hover:text-white'}`} />
            <span className={`text-[10px] font-semibold transition-colors ${isHomeOrSub ? 'text-[#DDA63A]' : 'text-[#9CA3AF]'}`}>Ana Sayfa</span>
          </button>
          <button onClick={() => setActiveTab('map')} className="flex flex-col items-center gap-1.5 flex-1 group">
            <MapIcon size={22} className={`transition-colors ${activeTab === 'map' ? 'text-[#DDA63A]' : 'text-[#9CA3AF] group-hover:text-white'}`} />
            <span className={`text-[10px] font-semibold transition-colors ${activeTab === 'map' ? 'text-[#DDA63A]' : 'text-[#9CA3AF]'}`}>Harita</span>
          </button>
          <button onClick={() => setActiveTab('donate')} className="flex flex-col items-center gap-1.5 flex-1 group">
            <HandCoins size={22} className={`transition-colors ${activeTab === 'donate' ? 'text-[#DDA63A]' : 'text-[#9CA3AF] group-hover:text-white'}`} />
            <span className={`text-[10px] font-semibold transition-colors ${activeTab === 'donate' ? 'text-[#DDA63A]' : 'text-[#9CA3AF]'}`}>Kumbaram</span>
          </button>
          <button onClick={() => setActiveTab('profile')} className="flex flex-col items-center gap-1.5 flex-1 group">
            <User size={22} className={`transition-colors ${activeTab === 'profile' ? 'text-[#DDA63A]' : 'text-[#9CA3AF] group-hover:text-white'}`} />
            <span className={`text-[10px] font-semibold transition-colors ${activeTab === 'profile' ? 'text-[#DDA63A]' : 'text-[#9CA3AF]'}`}>Profil</span>
          </button>
        </div>

      </div>

      {/* Floating Action Button for Code */}
      <button 
        onClick={() => setShowCode(true)}
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 bg-[#DDA63A] text-[#111827] px-6 py-4 rounded-full font-bold shadow-xl flex items-center gap-2 hover:bg-yellow-500 transition-colors z-40"
      >
        <Code2 size={24} />
        <span className="hidden md:inline">Expo (React Native) Kodunu Al</span>
      </button>

      {/* Code Modal */}
      {showCode && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-[#1F2937] w-full max-w-4xl max-h-[90vh] rounded-2xl flex flex-col border border-gray-700 shadow-2xl">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center shrink-0">
               <h2 className="text-white text-xl font-bold flex items-center gap-2">
                 <Code2 className="text-[#DDA63A]" />
                 App.js <span className="text-sm font-normal text-gray-400">(Expo Snack İçin)</span>
               </h2>
               <button onClick={() => setShowCode(false)} className="text-gray-400 hover:text-white p-2">Kapat</button>
            </div>
            <div className="flex-1 overflow-auto p-4 bg-[#0d1117]">
               <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">{expoCode}</pre>
            </div>
            <div className="p-4 border-t border-gray-700 flex justify-end shrink-0">
               <button 
                 onClick={handleCopy}
                 className="bg-[#DDA63A] text-[#111827] font-bold py-3 px-8 rounded-xl flex items-center gap-2 hover:bg-yellow-500 transition-colors"
               >
                 {copied ? <><Check size={20} /> Kopyalandı!</> : <><Copy size={20} /> Kodu Kopyala</>}
               </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS to hide scrollbars */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
