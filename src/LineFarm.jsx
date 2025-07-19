import { useState, useMemo } from 'react';
import LazyImage from './LazyImage';
import { Search, ChevronDown } from 'lucide-react';

// 修改圖片路徑配置
const IMAGE_CONFIG = {
    tags: {
        categories: {
            Bakery: 'Bakery',
            BBQ_Meat_Shop: 'BBQ_Meat_Shop',
            Beehive: 'Beehive',
            Blast_Furnace: 'Blast_Furnace',
            Burger_Shack: 'Burger_Shack',
            Cafe: 'Cafe',
            Chinese_Eatery: 'Chinese_Eatery',
            Crepe_Stand: 'Crepe_Stand',
            Dairy_Factory: 'Dairy_Factory',
            Donburi_Shop: 'Donburi_Shop',
            Fish: 'Fish',
            Flower_Shop: 'Flower_Shop',
            Food_Cart: 'Food_Cart',
            Grain: 'Grain',
            Ice_Cream_Parlor: 'Ice_Cream_Parlor',
            Japanese_Cafe: 'Japanese_Cafe',
            Jewelers: 'Jewelers',
            Juice_Stand: 'Juice_Stand',
            Korean_Restaurant: 'Korean_Restaurant',
            Loom: 'Loom',
            Patisserie: 'Patisserie',
            Pizzeria: 'Pizzeria',
            Ramen_House: 'Ramen_House',
            Salad_Shop: 'Salad_Shop',
            Sauce_Store: 'Sauce_Store',
            Stock: 'Stock',
            Sugar_Refiner: 'Sugar_Refiner',
            SuShi_Bar: 'SuShi_Bar',
            Tailor_Shop: 'Tailor_Shop',
            Thai_Restaurant: 'Thai_Restaurant',
            Thugz_Place: 'Thugz_Place',
            Wagashi_Store: 'Wagashi_Store'
        }
    },
    roles: {
        categories: {
            S: 'S',
            A: 'A',
            B: 'B',
            C: 'C',
        }
    }
};

const CATEGORY_NAMES = {
    Bakery: '麵包店',
    BBQ_Meat_Shop: '鐵板燒餐廳',
    Beehive: '養蜂箱',
    Blast_Furnace: '高爐',
    Burger_Shack: '漢堡店',
    Cafe: '咖啡店',
    Chinese_Eatery: '中華餐廳',
    Crepe_Stand: '可麗餅店',
    Dairy_Factory: '酪農工廠',
    Donburi_Shop: '蓋飯專賣店',
    Fish: '魚',
    Flower_Shop: '花卉小舖',
    Food_Cart: '路邊攤',
    Grain: '穀物',
    Ice_Cream_Parlor: '冰淇淋店',
    Japanese_Cafe: '和風茶館',
    Jewelers: '珠寶店',
    Juice_Stand: '果汁店',
    Korean_Restaurant: '韓式餐廳',
    Loom: '織布機',
    Patisserie: '蛋糕店',
    Pizzeria: '義式餐廳',
    Ramen_House: '拉麵店',
    Salad_Shop: '沙拉商店',
    Sauce_Store: '醬料店',
    Stock: '原料',
    Sugar_Refiner: '製糖機',
    SuShi_Bar: '壽司店',
    Tailor_Shop: '裁縫店',
    Thai_Restaurant: '泰式餐廳',
    Thugz_Place: '台灣路邊攤',
    Wagashi_Store: '日式甜點店'
};

// 修改圖片路徑處理函數
const getTagImagePath = (categoryPath, filename) => {
    // 處理 filename 可能為 undefined 或 null 的情況
    if (!filename) {
        // 提供一個預設圖片路徑或返回 null
        return new URL('./assets/tags/default.webp', import.meta.url).href;
    }
    return new URL(`./assets/tags/${categoryPath}/${filename}`, import.meta.url).href;
};


const getRoleImagePath = (category, filename) => {
    const categoryPath = IMAGE_CONFIG.roles.categories[category] || 'misc';
    return new URL(`./assets/roles/${categoryPath}/${filename}`, import.meta.url).href;
};

// 重構標籤數據結構為扁平化列表
const allTags = [
    { id: 'Bread', name: '麵包', filename: 'Bread.webp', categoryPath: 'Bakery' },
    { id: 'CornBread', name: '玉米麵包', filename: 'CornBread.webp', categoryPath: 'Bakery' },
    { id: 'Melon_Bread', name: '菠蘿麵包', filename: 'Melon_Bread.webp', categoryPath: 'Bakery' },
    { id: 'Donuts', name: '甜甜圈', filename: 'Donuts.webp', categoryPath: 'Bakery' },
    { id: 'Croquette', name: '可樂餅', filename: 'Croquette.webp', categoryPath: 'Bakery' },
    { id: 'Panini', name: '帕尼尼', filename: 'Panini.webp', categoryPath: 'Bakery' },
    { id: 'Castella', name: '蜂蜜蛋糕', filename: 'Castella.webp', categoryPath: 'Bakery' },
    { id: 'Waffles', name: '比利時鬆餅', filename: 'Waffles.webp', categoryPath: 'Bakery' },
    { id: 'Macaron', name: '馬卡龍', filename: 'Macaron.webp', categoryPath: 'Bakery' },
    { id: 'Yakisoba', name: '炒麵', filename: 'Yakisoba.webp', categoryPath: 'BBQ_Meat_Shop' },
    { id: 'Okonomiyaki', name: '大阪燒', filename: 'Okonomiyaki.webp', categoryPath: 'BBQ_Meat_Shop' },
    { id: 'Salmon_Steak', name: '鮭魚排', filename: 'Salmon_Steak.webp', categoryPath: 'BBQ_Meat_Shop' },
    { id: 'Canola_Honey', name: '油菜花蜜', filename: 'Canola_Honey.webp', categoryPath: 'Beehive' },
    { id: 'Silver_Ore', name: '銀礦', filename: 'Silver_Ore.webp', categoryPath: 'Blast_Furnace' },
    { id: 'Glod_Ore', name: '金礦', filename: 'Glod_Ore.webp', categoryPath: 'Blast_Furnace' },
    { id: 'Silver_Ingot', name: '銀條', filename: 'Silver_Ingot.webp', categoryPath: 'Blast_Furnace' },
    { id: 'Glod_Ingot', name: '金條', filename: 'Glod_Ingot.webp', categoryPath: 'Blast_Furnace' },
    { id: 'Sapphire', name: '藍寶石', filename: 'Sapphire.webp', categoryPath: 'Blast_Furnace' },
    { id: 'Ruby', name: '紅寶石', filename: 'Ruby.webp', categoryPath: 'Blast_Furnace' },
    { id: 'Apple_Pie', name: '蘋果派', filename: 'Apple_Pie.webp', categoryPath: 'Burger_Shack' },
    { id: 'French_Fries', name: '薯條', filename: 'French_Fries.webp', categoryPath: 'Burger_Shack' },
    { id: 'Hamburger', name: '漢堡', filename: 'Hamburger.webp', categoryPath: 'Burger_Shack' },
    { id: 'Spicy_Cheeseburger', name: '香辣起司漢堡', filename: 'Spicy_Cheeseburger.webp', categoryPath: 'Burger_Shack' },
    { id: 'Affogato', name: '冰淇淋咖啡', filename: 'Affogato.webp', categoryPath: 'Cafe' },
    { id: 'Cafe_Latte', name: '拿鐵咖啡', filename: 'Cafe_Latte.webp', categoryPath: 'Cafe' },
    { id: 'Espresso', name: '濃縮咖啡', filename: 'Espresso.webp', categoryPath: 'Cafe' },
    { id: 'Honey_Toast', name: '蜜糖吐司', filename: 'Honey_Toast.webp', categoryPath: 'Cafe' },
    { id: 'Hot_Chocolate', name: '熱巧克力', filename: 'Hot_Chocolate.webp', categoryPath: 'Cafe' },
    { id: 'Pancakes', name: '美式鬆餅', filename: 'Pancakes.webp', categoryPath: 'Cafe' },
    { id: 'Vienna_Coffee', name: '維也納咖啡', filename: 'Vienna_Coffee.webp', categoryPath: 'Cafe' },
    { id: 'Chilled_Chinese_Noodle', name: '中華涼麵', filename: 'Chilled_Chinese_Noodle.webp', categoryPath: 'Chinese_Eatery' },
    { id: 'Chinese_Fried_Rice', name: '炒飯', filename: 'Chinese_Fried_Rice.webp', categoryPath: 'Chinese_Eatery' },
    { id: 'Mapo_Tofu', name: '麻婆豆腐', filename: 'Mapo_Tofu.webp', categoryPath: 'Chinese_Eatery' },
    { id: 'Spicy_Prawns', name: '辣炒蝦仁', filename: 'Spicy_Prawns.webp', categoryPath: 'Chinese_Eatery' },
    { id: 'Tan_Tan_Noodle', name: '擔擔麵', filename: 'Tan_Tan_Noodle.webp', categoryPath: 'Chinese_Eatery' },
    { id: 'Apple_Cinnamon_Crepe', name: '蘋果肉桂可麗餅', filename: 'Apple_Cinnamon_Crepe.webp', categoryPath: 'Crepe_Stand' },
    { id: 'Bacon_Crepe', name: '培根可麗餅', filename: 'Bacon_Crepe.webp', categoryPath: 'Crepe_Stand' },
    { id: 'Chocolate_Crepe', name: '巧克力可麗餅', filename: 'Chocolate_Crepe.webp', categoryPath: 'Crepe_Stand' },
    { id: 'Crepe', name: '可麗餅', filename: 'Crepe.webp', categoryPath: 'Crepe_Stand' },
    { id: 'Strawberry_Crepe', name: '草莓可麗餅', filename: 'Strawberry_Crepe.webp', categoryPath: 'Crepe_Stand' },
    { id: 'Strawberry_Ice_Cream_Crepe', name: '草莓冰淇淋可麗餅', filename: 'Strawberry_Ice_Cream_Crepe.webp', categoryPath: 'Crepe_Stand' },
    { id: 'Butter', name: '奶油', filename: 'Butter.webp', categoryPath: 'Dairy_Factory' },
    { id: 'Cheese', name: '起司', filename: 'Cheese.webp', categoryPath: 'Dairy_Factory' },
    { id: 'Fresh_Cream', name: '鮮奶油', filename: 'Fresh_Cream.webp', categoryPath: 'Dairy_Factory' },
    { id: 'Eel_Rice_Bowl', name: '鰻魚蓋飯', filename: 'Eel_Rice_Bowl.webp', categoryPath: 'Donburi_Shop' },
    { id: 'Katsu_Rice_Bowl', name: '豬排蓋飯', filename: 'Katsu_Rice_Bowl.webp', categoryPath: 'Donburi_Shop' },
    { id: 'Pork_Rice_Bowl', name: '豬肉蓋飯', filename: 'Pork_Rice_Bowl.webp', categoryPath: 'Donburi_Shop' },
    { id: 'Seafood_Rice_Bowl', name: '海鮮蓋飯', filename: 'Seafood_Rice_Bowl.webp', categoryPath: 'Donburi_Shop' },
    { id: 'Tempura_Rice_Bowl', name: '炸蝦蓋飯', filename: 'Tempura_Rice_Bowl.webp', categoryPath: 'Donburi_Shop' },
    { id: 'Tuna_Rice_Bowl', name: '鮪魚蓋飯', filename: 'Tuna_Rice_Bowl.webp', categoryPath: 'Donburi_Shop' },
    { id: 'Eel', name: '鰻魚', filename: 'Eel.webp', categoryPath: 'Fish' },
    { id: 'Prawn', name: '蝦子', filename: 'Prawn.webp', categoryPath: 'Fish' },
    { id: 'Salmon', name: '鮭魚', filename: 'Salmon.webp', categoryPath: 'Fish' },
    { id: 'Tuna', name: '鮪魚', filename: 'Tuna.webp', categoryPath: 'Fish' },
    { id: 'Egg_On_Toast', name: '蛋吐司', filename: 'Egg_On_Toast.webp', categoryPath: 'Food_Cart' },
    { id: 'Ham_and_Egg_Sandwich', name: '火腿蛋三明治', filename: 'Ham_and_Egg_Sandwich.webp', categoryPath: 'Food_Cart' },
    { id: 'Hot_Dog', name: '熱狗', filename: 'Hot_Dog.webp', categoryPath: 'Food_Cart' },
    { id: 'Popcorn', name: '爆米花', filename: 'Popcorn.webp', categoryPath: 'Food_Cart' },
    { id: 'Pork_Skewers', name: '烤肉串', filename: 'Pork_Skewers.webp', categoryPath: 'Food_Cart' },
    { id: 'Apple', name: '蘋果', filename: 'Apple.webp', categoryPath: 'Grain' },
    { id: 'Cabbage', name: '高麗菜', filename: 'Cabbage.webp', categoryPath: 'Grain' },
    { id: 'Carrot', name: '胡蘿蔔', filename: 'Carrot.webp', categoryPath: 'Grain' },
    { id: 'Chilli', name: '辣椒', filename: 'Chilli.webp', categoryPath: 'Grain' },
    { id: 'Cocoa', name: '可可', filename: 'Cocoa.webp', categoryPath: 'Grain' },
    { id: 'Coffee_Bean', name: '咖啡豆', filename: 'Coffee_Bean.webp', categoryPath: 'Grain' },
    { id: 'Potato', name: '馬鈴薯', filename: 'Potato.webp', categoryPath: 'Grain' },
    { id: 'Pumpkin', name: '南瓜', filename: 'Pumpkin.webp', categoryPath: 'Grain' },
    { id: 'Read_Bean', name: '紅豆', filename: 'Read_Bean.webp', categoryPath: 'Grain' },
    { id: 'Tomato', name: '番茄', filename: 'Tomato.webp', categoryPath: 'Grain' },
    { id: 'Chocolate_Ice_Cream', name: '巧克力冰淇淋', filename: 'Chocolate_Ice_Cream.webp', categoryPath: 'Ice_Cream_Parlor' },
    { id: 'Fruit_Yoghurt', name: '水果優格', filename: 'Fruit_Yoghurt.webp', categoryPath: 'Ice_Cream_Parlor' },
    { id: 'Grape_Sherbet', name: '葡萄冰沙', filename: 'Grape_Sherbet.webp', categoryPath: 'Ice_Cream_Parlor' },
    { id: 'Strawberry_Ice_Cream', name: '草莓冰淇淋', filename: 'Strawberry_Ice_Cream.webp', categoryPath: 'Ice_Cream_Parlor' },
    { id: 'Vanilla_Ice_Cream', name: '香草冰淇淋', filename: 'Vanilla_Ice_Cream.webp', categoryPath: 'Ice_Cream_Parlor' },
    { id: 'Animitsu', name: '餡蜜', filename: 'Animitsu.webp', categoryPath: 'Japanese_Cafe' },
    { id: 'Green_Tea', name: '綠茶', filename: 'Green_Tea.webp', categoryPath: 'Japanese_Cafe' },
    { id: 'Macha_IceCream', name: '抹茶冰淇淋', filename: 'Macha_IceCream.webp', categoryPath: 'Japanese_Cafe' },
    { id: 'Matcha_Tea', name: '抹茶', filename: 'Matcha_Tea.webp', categoryPath: 'Japanese_Cafe' },
    { id: 'Oolong_Tea', name: '烏龍茶', filename: 'Oolong_Tea.webp', categoryPath: 'Japanese_Cafe' },
    { id: 'Earrings', name: '耳環', filename: 'Earrings.webp', categoryPath: 'Jewelers' },
    { id: 'Necklace', name: '項鍊', filename: 'Necklace.webp', categoryPath: 'Jewelers' },
    { id: 'Sapphire_Tiara', name: '藍寶石皇冠', filename: 'Sapphire_Tiara.webp', categoryPath: 'Jewelers' },
    { id: 'Apple_Juice', name: '蘋果汁', filename: 'Apple_Juice.webp', categoryPath: 'Juice_Stand' },
    { id: 'Carrot_Juice', name: '胡蘿蔔汁', filename: 'Carrot_Juice.webp', categoryPath: 'Juice_Stand' },
    { id: 'Fruit_Juice', name: '綜合果汁', filename: 'Fruit_Juice.webp', categoryPath: 'Juice_Stand' },
    { id: 'Grape_Juice', name: '葡萄汁', filename: 'Grape_Juice.webp', categoryPath: 'Juice_Stand' },
    { id: 'Strawberry_Juice', name: '草莓汁', filename: 'Strawberry_Juice.webp', categoryPath: 'Juice_Stand' },
    { id: 'Tomato_Juice', name: '番茄汁', filename: 'Tomato_Juice.webp', categoryPath: 'Juice_Stand' },
    { id: 'Fresh_Cream_Cake', name: '鮮奶油蛋糕', filename: 'Fresh_Cream_Cake.webp', categoryPath: 'Patisserie' },
    { id: 'Fruit_Tart', name: '水果塔', filename: 'Fruit_Tart.webp', categoryPath: 'Patisserie' },
    { id: 'Matcha_Roll_Cake', name: '抹茶蛋糕捲', filename: 'Matcha_Roll_Cake.webp', categoryPath: 'Patisserie' },
    { id: 'Pumpkin_Pie', name: '南瓜派', filename: 'Pumpkin_Pie.webp', categoryPath: 'Patisserie' },
    { id: 'Roll_Cake', name: '蛋糕捲', filename: 'Roll_Cake.webp', categoryPath: 'Patisserie' },
    { id: 'Strawberry_Cake', name: '草莓蛋糕', filename: 'Strawberry_Cake.webp', categoryPath: 'Patisserie' },
    { id: 'Carbonara', name: '奶油培根義大利麵', filename: 'Carbonara.webp', categoryPath: 'Pizzeria' },
    { id: 'Gratin', name: '義式焗飯', filename: 'Gratin.webp', categoryPath: 'Pizzeria' },
    { id: 'Lasagne', name: '千層麵', filename: 'Lasagne.webp', categoryPath: 'Pizzeria' },
    { id: 'Pumpkin_Soup', name: '南瓜濃湯', filename: 'Pumpkin_Soup.webp', categoryPath: 'Pizzeria' },
    { id: 'Spicy_Potato_Pizza', name: '辣醬洋芋披薩', filename: 'Spicy_Potato_Pizza.webp', categoryPath: 'Pizzeria' },
    { id: 'Dumpling', name: '煎餃', filename: 'Dumpling.webp', categoryPath: 'Ramen_House' },
    { id: 'Miso_Ramen', name: '味噌拉麵', filename: 'Miso_Ramen.webp', categoryPath: 'Ramen_House' },
    { id: 'Pork_Broth_Ramen', name: '豚骨拉麵', filename: 'Pork_Broth_Ramen.webp', categoryPath: 'Ramen_House' },
    { id: 'Shoyu_Ramen', name: '醬油拉麵', filename: 'Shoyu_Ramen.webp', categoryPath: 'Ramen_House' },
    { id: 'Miso', name: '味噌', filename: 'Miso.webp', categoryPath: 'Sauce_Store' },
    { id: 'Soy_Sauce', name: '醬油', filename: 'Soy_Sauce.webp', categoryPath: 'Sauce_Store' },
    { id: 'Egg', name: '雞蛋', filename: 'Egg.webp', categoryPath: 'Stock' },
    { id: 'Milk', name: '牛奶', filename: 'Milk.webp', categoryPath: 'Stock' },
    { id: 'Pork', name: '豬肉', filename: 'Pork.webp', categoryPath: 'Stock' },
    { id: 'Sugar', name: '糖', filename: 'Sugar.webp', categoryPath: 'Sugar_Refiner' },
    { id: 'Syrup', name: '糖漿', filename: 'Syrup.webp', categoryPath: 'Sugar_Refiner' },
    { id: 'Eel_Sushi', name: '鰻魚壽司', filename: 'Eel_Sushi.webp', categoryPath: 'SuShi_Bar' },
    { id: 'Prawn_Sushi', name: '蝦壽司', filename: 'Prawn_Sushi.webp', categoryPath: 'SuShi_Bar' },
    { id: 'Salmon_Sushi', name: '鮭魚壽司', filename: 'Salmon_Sushi.webp', categoryPath: 'SuShi_Bar' },
    { id: 'Skirt', name: '裙子', filename: 'Skirt.webp', categoryPath: 'Tailor_Shop' },
    { id: 'Parka', name: '帽T', filename: 'Parka.webp', categoryPath: 'Tailor_Shop' },
    { id: 'Hujiao_Bing', name: '胡椒餅', filename: 'Hujiao_Bing.webp', categoryPath: 'Thugz_Place' },
    { id: 'Mooncake', name: '月餅', filename: 'Mooncake.webp', categoryPath: 'Thugz_Place' },
    { id: 'New_Year_Rice_Cake', name: '年糕', filename: 'New_Year_Rice_Cake.webp', categoryPath: 'Thugz_Place' },
    { id: 'Stinky_Tofu', name: '臭豆腐', filename: 'Stinky_Tofu.webp', categoryPath: 'Thugz_Place' },
    { id: 'Zongzi', name: '粽子', filename: 'Zongzi.webp', categoryPath: 'Thugz_Place' },
    { id: 'Jam_Pancake', name: '鯛魚燒', filename: 'Jam_Pancake.webp', categoryPath: 'Wagashi_Store' },
    { id: 'Red_Bean_Soup', name: '紅豆湯', filename: 'Red_Bean_Soup.webp', categoryPath: 'Wagashi_Store' },
    { id: 'Sponge_Cake', name: '銅鑼燒', filename: 'Sponge_Cake.webp', categoryPath: 'Wagashi_Store' },
    { id: 'Strawberry_Mochi', name: '草莓大福', filename: 'Strawberry_Mochi.webp', categoryPath: 'Wagashi_Store' },
    { id: 'Sweet_Bean_Jelly', name: '水羊羹', filename: 'Sweet_Bean_Jelly.webp', categoryPath: 'Wagashi_Store' },
    { id: 'Sweet_Dumplings', name: '糯米糰子', filename: 'Sweet_Dumplings.webp', categoryPath: 'Wagashi_Store' },
    { id: 'Wool_Cloth', name: '羊毛布料', filename: 'Wool_Cloth.webp', categoryPath: 'Loom' },
];


const imageData = [
    {
        "id": 1,
        "category": "S",
        "filename": "S_Honeybee_Sally.webp",
        "title": "蜜蜂莎莉",
        "tags": [
            "Cheese",
            "Prawn_Sushi",
            "Animitsu"
        ]
    },
    {
        "id": 2,
        "category": "S",
        "filename": "S_Pirate_Brown.webp",
        "title": "海盜熊大",
        "tags": [
            "Glod_Ingot",
            "Sapphire",
            "Earrings"
        ]
    },
    {
        "id": 3,
        "category": "S",
        "filename": "S_W_Brown_2.webp",
        "title": "西瓜熊大2號",
        "tags": [
            "Tuna",
            "Sapphire_Tiara",
            "Macha_IceCream"
        ]
    },
    {
        "id": 4,
        "category": "A",
        "filename": "A_Astronaut_Brown.webp",
        "title": "太空人熊大",
        "tags": [
            "Cocoa",
            "Grape_Juice",
            "Carbonara"
        ]
    },
    {
        "id": 5,
        "category": "A",
        "filename": "A_Beach_King_Brown.webp",
        "title": "沙灘小霸王熊大",
        "tags": [
            "Strawberry_Juice",
            "Vanilla_Ice_Cream",
            "Grape_Sherbet"
        ]
    },
    {
        "id": 6,
        "category": "A",
        "filename": "A_Calico_Cat_Brown.webp",
        "title": "三色貓熊大",
        "tags": [
            "Egg_On_Toast",
            "Salmon",
            "Yakisoba"
        ]
    },
    {
        "id": 7,
        "category": "A",
        "filename": "A_Clucky_Brown.webp",
        "title": "小雞熊大",
        "tags": [
            "Egg",
            "Pumpkin_Soup",
            "Chilled_Chinese_Noodle"
        ]
    },
    {
        "id": 8,
        "category": "A",
        "filename": "A_Coffee_Cup_Brown.webp",
        "title": "咖啡杯熊大",
        "tags": [
            "Espresso",
            "Cafe_Latte",
            "Vienna_Coffee"
        ]
    },
    {
        "id": 9,
        "category": "A",
        "filename": "A_Devil_Brown.webp",
        "title": "惡魔熊大",
        "tags": [
            "Chilli",
            "Tan_Tan_Noodle",
            "Spicy_Potato_Pizza"
        ]
    },
    {
        "id": 10,
        "category": "A",
        "filename": "A_Duster_Brown.webp",
        "title": "除塵熊大",
        "tags": [
            "Hot_Dog",
            "Strawberry_Juice",
            "Lasagne"
        ]
    },
    {
        "id": 11,
        "category": "A",
        "filename": "A_Fireman_Brown.webp",
        "title": "消防員熊大",
        "tags": [
            "Pork_Skewers",
            "Katsu_Rice_Bowl",
            "Eel_Sushi"
        ]
    },
    {
        "id": 12,
        "category": "A",
        "filename": "A_Flower_Sally.webp",
        "title": "花莎莉",
        "tags": [
            "Strawberry_Ice_Cream_Crepe",
            "Fruit_Tart",
            "Fruit_Yoghurt"
        ]
    },
    {
        "id": 13,
        "category": "A",
        "filename": "A_Football_Club_Brown.webp",
        "title": "橄欖球隊熊大",
        "tags": [
            "Hamburger",
            "Pork_Broth_Ramen",
            "Pork_Rice_Bowl"
        ]
    },
    {
        "id": 14,
        "category": "A",
        "filename": "A_Franken_Brown.webp",
        "title": "科熊怪人熊大",
        "tags": [
            "Hot_Dog",
            "Zongzi",
            "Sweet_Dumplings"
        ]
    },
    {
        "id": 15,
        "category": "A",
        "filename": "A_Hawaiian_Brown.webp",
        "title": "夏威夷熊大",
        "tags": [
            "Syrup",
            "Apple_Pie",
            "Chocolate_Ice_Cream"
        ]
    },
    {
        "id": 16,
        "category": "A",
        "filename": "A_Hipster_Brown.webp",
        "title": "時尚熊大",
        "tags": [
            "Apple_Cinnamon_Crepe",
            "Strawberry_Juice",
            "Strawberry_Ice_Cream"
        ]
    },
    {
        "id": 17,
        "category": "A",
        "filename": "A_Kid_Moon.webp",
        "title": "幼稚園饅頭人",
        "tags": [
            "Hamburger",
            "Honey_Toast",
            "Hujiao_Bing"
        ]
    },
    {
        "id": 18,
        "category": "A",
        "filename": "A_Maneki_Neko_Brown.webp",
        "title": "招財貓熊大",
        "tags": [
            "Glod_Ingot",
            "Katsu_Rice_Bowl",
            "Spicy_Potato_Pizza"
        ]
    },
    {
        "id": 19,
        "category": "A",
        "filename": "A_Officer_Brown.webp",
        "title": "警察熊大",
        "tags": [
            "Donuts",
            "Hot_Chocolate",
            "Affogato"
        ]
    },
    {
        "id": 20,
        "category": "A",
        "filename": "A_Princess_Cony.webp",
        "title": "公主兔兔",
        "tags": [
            "Canola_Honey",
            "Pancakes",
            "Skirt"
        ]
    },
    {
        "id": 21,
        "category": "A",
        "filename": "A_Romantic_Winter_Brown.webp",
        "title": "浪漫冬季熊大",
        "tags": [
            "Cafe_Latte",
            "Tuna_Rice_Bowl",
            "Salmon_Steak"
        ]
    },
    {
        "id": 22,
        "category": "A",
        "filename": "A_Rose_Cony.webp",
        "title": "花朵妖精兔兔",
        "tags": [
            "Apple_Cinnamon_Crepe",
            "Macaron",
            "Sweet_Bean_Jelly"
        ]
    },
    {
        "id": 23,
        "category": "A",
        "filename": "A_Safari_Brown.webp",
        "title": "探險隊熊大",
        "tags": [
            "Silver_Ingot",
            "Spicy_Prawns",
            "Seafood_Rice_Bowl",
        ]
    },
    {
        "id": 24,
        "category": "A",
        "filename": "A_Santa_Cony.webp",
        "title": "聖誕兔兔",
        "tags": [
            "Apple_Juice",
            "Vienna_Coffee",
            "Prawn_Sushi",
        ]
    },
    {
        "id": 25,
        "category": "A",
        "filename": "A_Shio_Ramen_Brown.webp",
        "title": "鹽味拉麵熊大",
        "tags": [
            "Butter",
            "Ruby",
            "Skirt",
        ]
    },
    {
        "id": 26,
        "category": "A",
        "filename": "A_Ski_Jumper_Sally.webp",
        "title": "跳台滑雪莎莉",
        "tags": [
            "Cafe_Latte",
            "Macaron",
            "Pancakes"
        ]
    },
    {
        "id": 27,
        "category": "A",
        "filename": "A_Summer_Break_Cony.webp",
        "title": "放暑假兔兔",
        "tags": [
            "Strawberry_Juice",
            "Fruit_Tart",
            "Animitsu"
        ]
    },
    {
        "id": 28,
        "category": "A",
        "filename": "A_Super_Brown.webp",
        "title": "超人熊大",
        "tags": [
            "Red_Bean_Soup",
            "Sponge_Cake",
            "Jam_Pancake",
        ]
    },
    {
        "id": 29,
        "category": "A",
        "filename": "A_Sweet_Potato_Brown.webp",
        "title": "烤番薯熊大",
        "tags": [
            "Sugar",
            "Croquette",
            "New_Year_Rice_Cake",
        ]
    },
    {
        "id": 30,
        "category": "A",
        "filename": "A_Sweets_Brown.webp",
        "title": "甜點熊大",
        "tags": [
            "Chocolate_Crepe",
            "Chocolate_Ice_Cream",
            "Matcha_Tea",
        ]
    },
    {
        "id": 31,
        "category": "A",
        "filename": "A_Tranditional_Grab_Leonard.webp",
        "title": "傳統服飾雷納德",
        "tags": [
            "Pork",
            "Sweet_Bean_Jelly",
            "Parka"
        ]
    },
    {
        "id": 32,
        "category": "A",
        "filename": "A_Tranditional_Wedding_Cony.webp",
        "title": "傳統婚禮兔兔",
        "tags": [
            "Stinky_Tofu",
            "Red_Bean_Soup",
            "Pumpkin_Soup"
        ]
    },
    {
        "id": 33,
        "category": "A",
        "filename": "A_Tropic_Brown.webp",
        "title": "熱帶熊大",
        "tags": [
            "Apple_Cinnamon_Crepe",
            "Carrot_Juice",
            "Fruit_Tart",
        ]
    },
    {
        "id": 34,
        "category": "A",
        "filename": "A_Uniform_Moon.webp",
        "title": "校服饅頭人",
        "tags": [
            "Miso_Ramen",
            "Eel_Rice_Bowl",
            "Salmon_Sushi",
        ]
    },
    {
        "id": 35,
        "category": "A",
        "filename": "A_Vampire_Brown.webp",
        "title": "吸血鬼熊大",
        "tags": [
            "Coffee_Bean",
            "Shoyu_Ramen",
            "Tuna_Rice_Bowl"
        ]
    },
    {
        "id": 36,
        "category": "A",
        "filename": "A_Warrior_Brow.webp",
        "title": "勇者熊大",
        "tags": [
            "Hot_Dog",
            "Eel_Rice_Bowl",
            "Okonomiyaki"
        ]
    },
    {
        "id": 37,
        "category": "A",
        "filename": "A_White_Umbrella_Brown.webp",
        "title": "白傘熊大",
        "tags": [
            "Apple_Pie",
            "Pork_Broth_Ramen",
            "Matcha_Tea"
        ]
    },
    {
        "id": 38,
        "category": "B",
        "filename": "B_Archer_Jessica.webp",
        "title": "弓箭手潔西卡",
        "tags": [
            "Panini",
            "Castella",
        ]
    },
    {
        "id": 39,
        "category": "B",
        "filename": "B_Astronaut_Leonard.webp",
        "title": "太空人雷納德",
        "tags": [
            "Soy_Sauce",
            "Zongzi",
        ]
    },
    {
        "id": 40,
        "category": "B",
        "filename": "B_Astronaut_Sally.webp",
        "title": "太空人莎莉",
        "tags": [
            "Syrup",
            "Oolong_Tea",
        ]
    },
    {
        "id": 41,
        "category": "B",
        "filename": "B_Baby_Brown.webp",
        "title": "貝比熊大",
        "tags": [
            "Milk",
            "Cheese",
        ]
    },
    {
        "id": 42,
        "category": "B",
        "filename": "B_Basketball_Club_Brown.webp",
        "title": "籃球隊熊大",
        "tags": [
            "Ham_and_Egg_Sandwich",
            "Tempura_Rice_Bowl",
        ]
    },
    {
        "id": 43,
        "category": "B",
        "filename": "B_Beach_Celeb_Brown.webp",
        "title": "戲水小霸王熊大",
        "tags": [
            "Crepe",
            "Chocolate_Crepe",
        ]
    },
    {
        "id": 44,
        "category": "B",
        "filename": "B_Black_Cat_Moon.webp",
        "title": "黑貓饅頭人",
        "tags": [
            "Miso",
            "Stinky_Tofu",
        ]
    },
    {
        "id": 45,
        "category": "B",
        "filename": "B_Chef_Brown.webp",
        "title": "主廚熊大",
        "tags": [
            "Egg_On_Toast",
            "Mapo_Tofu",
        ]
    },
    {
        "id": 46,
        "category": "B",
        "filename": "B_Cosmos_Brown.webp",
        "title": "花朵妖精熊大",
        "tags": [
            "Hamburger",
            "Affogato",
        ]
    },
    {
        "id": 47,
        "category": "B",
        "filename": "B_Drummer_Brown.webp",
        "title": "鼓手熊大",
        "tags": [
            "Pork",
            "Bacon_Crepe",
        ]
    },
    {
        "id": 48,
        "category": "B",
        "filename": "B_Enchanter_Brown.webp",
        "title": "妖術師熊大",
        "tags": [
            "Miso",
            "Hujiao_Bing",
        ]
    },
    {
        "id": 49,
        "category": "B",
        "filename": "B_Festival_Dancer_Sally.webp",
        "title": "祭典舞者莎莉",
        "tags": [
            "Hot_Dog",
            "Okonomiyaki",
        ]
    },
    {
        "id": 50,
        "category": "B",
        "filename": "B_Flower_Leonard.webp",
        "title": "花雷納德",
        "tags": [
            "Cafe_Latte",
            "Pumpkin_Soup",
        ]
    },
    {
        "id": 51,
        "category": "B",
        "filename": "B_Goldfish_Catcher_Brown.webp",
        "title": "撈金魚熊大",
        "tags": [
            "Apple_Cinnamon_Crepe",
            "Yakisoba",
        ]
    },
    {
        "id": 52,
        "category": "B",
        "filename": "B_HoneyBee_Brown.webp",
        "title": "蜜蜂熊大",
        "tags": [
            "CornBread",
            "Honey_Toast",
        ]
    },
    {
        "id": 53,
        "category": "B",
        "filename": "B_Hot_Dumpling_Brown.webp",
        "title": "煎餃熊大",
        "tags": [
            "Soy_Sauce",
            "Dumpling",
        ]
    },
    {
        "id": 54,
        "category": "B",
        "filename": "B_Ice_Hockey_Brown.webp",
        "title": "冰上曲棍球熊大",
        "tags": [
            "Roll_Cake",
            "Waffles",
        ]
    },
    {
        "id": 55,
        "category": "B",
        "filename": "B_Kid_Leonard.webp",
        "title": "幼稚園雷納德",
        "tags": [
            "Apple_Juice",
            "Sponge_Cake",
        ]
    },
    {
        "id": 56,
        "category": "B",
        "filename": "B_Kid_Sally.webp",
        "title": "幼稚園莎莉",
        "tags": [
            "Tomato_Juice",
            "Mooncake",
        ]
    },
    {
        "id": 57,
        "category": "B",
        "filename": "B_Leaf_Umbrella_Leonard.webp",
        "title": "樹葉傘雷納德",
        "tags": [
            "Croquette",
            "Shoyu_Ramen",
        ]
    },
    {
        "id": 58,
        "category": "B",
        "filename": "B_Maneki_Neko_James.webp",
        "title": "招財貓詹姆士",
        "tags": [
            "Sweet_Bean_Jelly",
            "Green_Tea",
        ]
    },
    {
        "id": 59,
        "category": "B",
        "filename": "B_Maneki_Neko_Sally.webp",
        "title": "招財貓莎莉",
        "tags": [
            "Stinky_Tofu",
            "Sweet_Bean_Jelly",
        ]
    },
    {
        "id": 60,
        "category": "B",
        "filename": "B_Miso_Ramen_Brown.webp",
        "title": "味噌拉麵熊大",
        "tags": [
            "Miso",
            "Miso_Ramen",
        ]
    },
    {
        "id": 61,
        "category": "B",
        "filename": "B_Modern_Wedding_Brown.webp",
        "title": "現代婚禮熊大",
        "tags": [
            "Apple_Cinnamon_Crepe",
            "Affogato",
        ]
    },
    {
        "id": 62,
        "category": "B",
        "filename": "B_Mop_Brown.webp",
        "title": "拖地熊大",
        "tags": [
            "Pork_Skewers",
            "Eel_Rice_Bowl",
        ]
    },
    {
        "id": 63,
        "category": "B",
        "filename": "B_Musician_Brown.webp",
        "title": "音樂家熊大",
        "tags": [
            "Cocoa",
            "Macaron",
        ]
    },
    {
        "id": 64,
        "category": "B",
        "filename": "B_Pink_Ranger_Brown.webp",
        "title": "B Pink Ranger Brown",
        "tags": [
            "Espresso",
            "Croquette",
        ]
    },
    {
        "id": 65,
        "category": "B",
        "filename": "B_Prince_James.webp",
        "title": "王子詹姆士",
        "tags": [
            "Mooncake",
            "Salmon_Sushi",
        ]
    },
    {
        "id": 66,
        "category": "B",
        "filename": "B_Prince_Leonard.webp",
        "title": "王子雷納德",
        "tags": [
            "Zongzi",
            "Matcha_Roll_Cake",
        ]
    },
    {
        "id": 67,
        "category": "B",
        "filename": "B_Prince_Moon.webp",
        "title": "王子饅頭人",
        "tags": [
            "Dumpling",
            "Carbonara",
        ]
    },
    {
        "id": 68,
        "category": "B",
        "filename": "B_Red_Cape_Brown.webp",
        "title": "B Red Cape Brown",
        "tags": [
            "Hot_Dog",
            "Apple_Juice",
        ]
    },
    {
        "id": 69,
        "category": "B",
        "filename": "B_Red_Umbrella_Cony.webp",
        "title": "紅傘兔兔",
        "tags": [
            "Strawberry_Ice_Cream",
            "Strawberry_Crepe",
        ]
    },
    {
        "id": 70,
        "category": "B",
        "filename": "B_Relndeer_Brown.webp",
        "title": "馴鹿熊大",
        "tags": [
            "Soy_Sauce",
            "Chinese_Fried_Rice",
        ]
    },
    {
        "id": 71,
        "category": "B",
        "filename": "B_Romantic_Winter_Sally.webp",
        "title": "浪漫冬季莎莉",
        "tags": [
            "Apple_Pie",
            "Tan_Tan_Noodle",
        ]
    },
    {
        "id": 72,
        "category": "B",
        "filename": "B_Safari_Cony.webp",
        "title": "探險隊兔兔",
        "tags": [
            "Silver_Ore",
            "Affogato",
        ]
    },
    {
        "id": 73,
        "category": "B",
        "filename": "B_Safari_Sally.webp",
        "title": "探險隊莎莉",
        "tags": [
            "Glod_Ore",
            "Macaron",
        ]
    },
    {
        "id": 74,
        "category": "B",
        "filename": "B_Shoyu_Ramen_Brown.webp",
        "title": "醬油拉麵熊大",
        "tags": [
            "Soy_Sauce",
            "Shoyu_Ramen",
        ]
    },
    {
        "id": 75,
        "category": "B",
        "filename": "B_Soccer_Club_Brown.webp",
        "title": "足球隊熊大",
        "tags": [
            "Butter",
            "Panini",
        ]
    },
    {
        "id": 76,
        "category": "B",
        "filename": "B_Sorcerer_Brown.webp",
        "title": "魔術師熊大",
        "tags": [
            "Tomato",
            "Red_Bean_Soup",
        ]
    },
    {
        "id": 77,
        "category": "B",
        "filename": "B_Speed_Skier_Brown.webp",
        "title": "高速滑雪熊大",
        "tags": [
            "Espresso",
            "Fruit_Tart",
        ]
    },
    {
        "id": 78,
        "category": "B",
        "filename": "B_Squirrella_Brown.webp",
        "title": "松鼠熊大",
        "tags": [
            "Bread",
            "Fruit_Juice",
        ]
    },
    {
        "id": 79,
        "category": "B",
        "filename": "B_Summer_Break_Leonard.webp",
        "title": "放暑假雷納德",
        "tags": [
            "Prawn",
            "Jam_Pancake",
        ]
    },
    {
        "id": 80,
        "category": "B",
        "filename": "B_Summer_Break_Sally.webp",
        "title": "放暑假莎莉",
        "tags": [
            "Eel",
            "Spicy_Prawns",
        ]
    },
    {
        "id": 81,
        "category": "B",
        "filename": "B_Summer_Brown.webp",
        "title": "墨鏡熊大",
        "tags": [
            "Apple",
            "French_Fries",
        ]
    },
    {
        "id": 82,
        "category": "B",
        "filename": "B_Sweets_Jessica.webp",
        "title": "甜點潔西卡",
        "tags": [
            "Strawberry_Juice",
            "Strawberry_Cake",
        ]
    },
    {
        "id": 83,
        "category": "B",
        "filename": "B_Tour_Guide_Sally.webp",
        "title": "導遊莎莉",
        "tags": [
            "Strawberry_Mochi",
            "Chilled_Chinese_Noodle",
        ]
    },
    {
        "id": 84,
        "category": "B",
        "filename": "B_Tranditional_Garb_Brown.webp",
        "title": "傳統服飾熊大",
        "tags": [
            "Mapo_Tofu",
            "Chilled_Chinese_Noodle",
        ]
    },
    {
        "id": 85,
        "category": "B",
        "filename": "B_Tranditional_Garb_Sally.webp",
        "title": "傳統服飾莎莉",
        "tags": [
            "Strawberry_Mochi",
            "Wool_Cloth",
        ]
    },
    {
        "id": 86,
        "category": "B",
        "filename": "B_Tranditional_Wedding_Brown.webp",
        "title": "傳統婚禮熊大",
        "tags": [
            "Miso",
            "Chinese_Fried_Rice",
        ]
    },
    {
        "id": 87,
        "category": "B",
        "filename": "B_Tranditional_Wedding_James.webp",
        "title": "傳統婚禮詹姆士",
        "tags": [
            "Pumpkin_Pie",
            "Oolong_Tea",
        ]
    },
    {
        "id": 88,
        "category": "B",
        "filename": "B_Tropic_Cony.webp",
        "title": "熱帶兔兔",
        "tags": [
            "Apple_Pie",
            "Hot_Chocolate",
        ]
    },
    {
        "id": 89,
        "category": "B",
        "filename": "B_Trumpet_Player_Brown.webp",
        "title": "小喇叭熊大",
        "tags": [
            "Bread",
            "Ham_and_Egg_Sandwich",
        ]
    },
    {
        "id": 90,
        "category": "B",
        "filename": "B_Uniform_Leonard.webp",
        "title": "校服雷納德",
        "tags": [
            "Hot_Dog",
            "Mapo_Tofu",
        ]
    },
    {
        "id": 91,
        "category": "B",
        "filename": "B_W_Brown_4.webp",
        "title": "西瓜熊大4號",
        "tags": [
            "Fruit_Juice",
            "Fruit_Yoghurt",
        ]
    },
    {
        "id": 92,
        "category": "B",
        "filename": "B_WANNEBE_Dino_Brown.webp",
        "title": "WANNABE 恐龍熊大",
        "tags": [
            "Cabbage",
            "Pork_Rice_Bowl",
        ]
    },
    {
        "id": 93,
        "category": "B",
        "filename": "B_White_Cat_Brown.webp",
        "title": "白貓熊大",
        "tags": [
            "Milk",
            "Prawn",
        ]
    },
    {
        "id": 94,
        "category": "B",
        "filename": "B_Wizard_Moon.webp",
        "title": "魔法師饅頭人",
        "tags": [
            "Espresso",
            "Sapphire",
        ]
    },
    {
        "id": 95,
        "category": "B",
        "filename": "B_Yellow_Ranger_Brwon.webp",
        "title": "黃帽T熊大",
        "tags": [
            "Bacon_Crepe",
            "Pork_Broth_Ramen",
        ]
    },
    {
        "id": 96,
        "category": "C",
        "filename": "C_Cleaner_Brown.webp",
        "title": "清潔員熊大",
        "tags": [
            "Apple_Pie",
        ]
    },
    {
        "id": 97,
        "category": "C",
        "filename": "C_PoliceMan_Brown.webp",
        "title": "警察熊大",
        "tags": [
            "Hamburger",
        ]
    },
    {
        "id": 98,
        "category": "C",
        "filename": "C_Romantic_Winter_Leonard.webp",
        "title": "浪漫冬季雷納德",
        "tags": [
            "Croquette",
        ]
    },
    {
        "id": 99,
        "category": "C",
        "filename": "C_Romantic_Winter_Moon.webp",
        "title": "浪漫冬季饅頭人",
        "tags": [
            "Hamburger",
        ]
    },
    {
        "id": 100,
        "category": "C",
        "filename": "C_Safari_Leonard.webp",
        "title": "探險隊熊大",
        "tags": [
            "Bacon_Crepe",
        ]
    },
    {
        "id": 101,
        "category": "C",
        "filename": "C_Safari_Moon.webp",
        "title": "探險隊饅頭人",
        "tags": [
            "Hamburger",
        ]
    },
    {
        "id": 102,
        "category": "C",
        "filename": "C_Sweets_Leonard.webp",
        "title": "甜點雷納德",
        "tags": [
            "Melon_Bread",
        ]
    },
    {
        "id": 103,
        "category": "C",
        "filename": "C_Tropic_Jessica.webp",
        "title": "熱帶潔西卡",
        "tags": [
            "Vienna_Coffee",
        ]
    },
    {
        "id": 104,
        "category": "C",
        "filename": "C_Tropic_Moon.webp",
        "title": "熱帶饅頭人",
        "tags": [
            "Strawberry_Juice"
        ]
    },
    {
        "id": 105,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241020_10.webp",
        "title": "長笛熊大",
        "tags": [
            "CornBread",
        ]
    },
    {
        "id": 106,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241020_11.webp",
        "title": "棉花糖熊大",
        "tags": [
            "Apple",
        ]
    },
    {
        "id": 107,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241020_12.webp",
        "title": "南瓜熊大",
        "tags": [
            "Pumpkin",
        ]
    },
    {
        "id": 108,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241020_13.webp",
        "title": "WANNABE 長頸鹿熊大",
        "tags": [
            "Ham_and_Egg_Sandwich",
        ]
    },
    {
        "id": 109,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241020_14.webp",
        "title": "WANNEBE 白虎熊大",
        "tags": [
            "Spicy_Cheeseburger",
        ]
    },
    {
        "id": 110,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241020_15.webp",
        "title": "藍帽T熊大",
        "tags": [
            "Vienna_Coffee",
        ]
    },
    {
        "id": 111,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241020_16.webp",
        "title": "花饅頭人",
        "tags": [
            "Panini",
        ]
    },
    {
        "id": 112,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241020_17.webp",
        "title": "海之國王熊大",
        "tags": [
            "Melon_Bread",
        ]
    },
    {
        "id": 113,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241020_18.webp",
        "title": "咒語師熊大",
        "tags": [
            "Cocoa",
        ]
    },
    {
        "id": 114,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241020_19.webp",
        "title": "拳擊隊熊大",
        "tags": [
            "French_Fries",
        ]
    },
    {
        "id": 115,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241020_20.webp",
        "title": "網球隊熊大",
        "tags": [
            "CornBread",
        ]
    },
    {
        "id": 116,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241020_21.webp",
        "title": "馴鹿莎莉",
        "tags": [
            "Hot_Dog",
        ]
    },
    {
        "id": 117,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241020_22.webp",
        "title": "玫瑰莎莉",
        "tags": [
            "Crepe",
        ]
    },
    {
        "id": 118,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241020_23.webp",
        "title": "校服莎莉",
        "tags": [
            "Croquette",
        ]
    },
    {
        "id": 119,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241020_24.webp",
        "title": "太空人饅頭人",
        "tags": [
            "Eel",
        ]
    },
    {
        "id": 120,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241020_25.webp",
        "title": "太空人詹姆士",
        "tags": [
            "Read_Bean",
        ]
    },
    {
        "id": 121,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241020_26.webp",
        "title": "丸子熊大",
        "tags": [
            "Fresh_Cream",
        ]
    },
    {
        "id": 122,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241020_27.webp",
        "title": "木乃伊雷納德",
        "tags": [
            "Coffee_Bean",
        ]
    },
    {
        "id": 123,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241020_28.webp",
        "title": "招財貓熊大",
        "tags": [
            "Eel",
        ]
    },
    {
        "id": 124,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241020_29.webp",
        "title": "招財貓潔西卡",
        "tags": [
            "Necklace",
        ]
    },
    {
        "id": 125,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241020_30.webp",
        "title": "幼稚園詹姆士",
        "tags": [
            "Donuts",
        ]
    },
    {
        "id": 126,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241020_31.webp",
        "title": "傳統婚禮雷納德",
        "tags": [
            "Pork_Rice_Bowl",
        ]
    },
    {
        "id": 127,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241020_32.webp",
        "title": "傳統婚禮潔西卡",
        "tags": [
            "Mapo_Tofu",
        ]
    },
    {
        "id": 128,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241020_33.webp",
        "title": "粉紅傘詹姆士",
        "tags": [
            "Donuts",
        ]
    },
    {
        "id": 129,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241020_34.webp",
        "title": "放暑假饅頭人",
        "tags": [
            "Pork_Skewers",
        ]
    },
    {
        "id": 130,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241020_35.webp",
        "title": "擦窗戶熊大",
        "tags": [
            "Miso_Ramen",
        ]
    },
    {
        "id": 131,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241020_36.webp",
        "title": "洗衣服熊大",
        "tags": [
            "Dumpling",
        ]
    },
    {
        "id": 132,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241020_37.webp",
        "title": "雪車熊大",
        "tags": [
            "Donuts",
        ]
    },
    {
        "id": 133,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241020_38.webp",
        "title": "傳統服飾兔兔",
        "tags": [
            "Chinese_Fried_Rice",
        ]
    },
    {
        "id": 134,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241020_39.webp",
        "title": "甜點饅頭人",
        "tags": [
            "Fresh_Cream_Cake",
        ]
    },
    {
        "id": 135,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241020_4.webp",
        "title": "囚犯熊大",
        "tags": [
            "Potato",
        ]
    },
    {
        "id": 136,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241020_45.webp",
        "title": "商人雷納德",
        "tags": [
            "Mooncake",
        ]
    },
    {
        "id": 137,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241020_5.webp",
        "title": "紅色蝴蝶結熊大",
        "tags": [
            "Popcorn",
        ]
    },
    {
        "id": 138,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241020_6.webp",
        "title": "雨衣熊大",
        "tags": [
            "Carrot",
        ]
    },
    {
        "id": 139,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241020_7.webp",
        "title": "蜜蜂熊大",
        "tags": [
            "Sugar",
        ]
    },
    {
        "id": 140,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241020_8.webp",
        "title": "手風琴熊大",
        "tags": [
            "Melon_Bread",
        ]
    },
    {
        "id": 141,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241020_9.webp",
        "title": "銅鈸熊大",
        "tags": [
            "Egg_On_Toast",
        ]
    },
    {
        "id": 142,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241021_1.webp",
        "title": "小不點熊大",
        "tags": [
            "Milk",
        ]
    },
    {
        "id": 143,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241021_2.webp",
        "title": "咖哩烏龍麵熊大",
        "tags": [
            "Gratin",
        ]
    },
    {
        "id": 144,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241021_3.webp",
        "title": "西瓜熊大3號",
        "tags": [
            "Cabbage",
        ]
    },
    {
        "id": 145,
        "category": "C",
        "filename": "LINE_ALBUM_80鑽小寵_241021_4.webp",
        "title": "公主潔西卡",
        "tags": [
            "Vienna_Coffee",
        ]
    }
];

const LineFarm = () => {
    const [selectedTags, setSelectedTags] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedCategories, setExpandedCategories] = useState([]);

    const tagsByCategory = useMemo(() => {
        return allTags.reduce((acc, tag) => {
            const category = tag.categoryPath;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(tag);
            return acc;
        }, {});
    }, []);

    const filteredTags = useMemo(() => {
        if (!searchQuery) return null;
        return allTags.filter(tag =>
            tag.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    const handleTagClick = (tagId) => {
        setSelectedTags(prev =>
            prev.includes(tagId)
                ? prev.filter(t => t !== tagId)
                : [...prev, tagId]
        );
    };

    const toggleCategory = (category) => {
        setExpandedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const filteredImages = imageData.filter(img =>
        selectedTags.length === 0 ||
        img.tags.some(tag => selectedTags.includes(tag))
    );

    const TagButton = ({ tag, onClick, isSelected }) => (
        <button
            onClick={onClick}
            className={`flex items-center p-2 rounded-lg transition-all w-full text-left ${isSelected
                ? 'bg-blue-100 ring-2 ring-blue-400'
                : 'bg-gray-50 hover:bg-gray-100'
                }`}
        >
            <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                <LazyImage
                    src={getTagImagePath(tag.categoryPath, tag.filename)}
                    alt={tag.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <span className="ml-2 text-sm truncate">{tag.name}</span>
        </button>
    );

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-1/3 max-w-sm p-4 bg-white shadow-lg overflow-y-auto">
                <div className="sticky top-0 bg-white pt-4 pb-2 z-10">
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="搜尋標籤..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {selectedTags.length > 0 && (
                        <div className="p-3 bg-blue-50 rounded-lg mb-4">
                            <h3 className="font-semibold mb-2 text-gray-700">已選擇:</h3>
                            <div className="flex flex-wrap gap-2">
                                {selectedTags.map(tagId => {
                                    const tag = allTags.find(t => t.id === tagId);
                                    if (!tag) return null;
                                    return (
                                        <span
                                            key={tagId}
                                            className="inline-flex items-center bg-blue-200 text-blue-800 rounded-full px-3 py-1 text-sm shadow-sm"
                                        >
                                            {tag.name}
                                            <button
                                                onClick={() => handleTagClick(tagId)}
                                                className="ml-2 text-blue-600 hover:text-blue-800"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    {filteredTags ? (
                        <div className="grid grid-cols-1 gap-2">
                            {filteredTags.map(tag => (
                                <TagButton
                                    key={tag.id}
                                    tag={tag}
                                    onClick={() => handleTagClick(tag.id)}
                                    isSelected={selectedTags.includes(tag.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        Object.entries(tagsByCategory).map(([category, tags]) => (
                            <div key={category}>
                                <button
                                    onClick={() => toggleCategory(category)}
                                    className="w-full flex justify-between items-center p-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-left font-semibold transition-colors"
                                >
                                    <span>{CATEGORY_NAMES[category] || category.replace(/_/g, ' ')} ({tags.length})</span>
                                    <ChevronDown
                                        className={`w-5 h-5 transition-transform ${expandedCategories.includes(category) ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                {expandedCategories.includes(category) && (
                                    <div className="pt-2 pl-4 grid grid-cols-1 gap-2">
                                        {tags.map(tag => (
                                            <TagButton
                                                key={tag.id}
                                                tag={tag}
                                                onClick={() => handleTagClick(tag.id)}
                                                isSelected={selectedTags.includes(tag.id)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                    {filteredImages.map(img => (
                        <div key={img.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
                            <div className="aspect-[1/1] overflow-hidden">
                                <LazyImage
                                    src={getRoleImagePath(img.category, img.filename)}
                                    alt={img.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-lg mb-2 truncate">{img.title}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {img.tags.map(tagId => {
                                        const tag = allTags.find(t => t.id === tagId);
                                        if (!tag) return null;
                                        return (
                                            <div key={tagId} className="inline-flex items-center bg-gray-100 rounded-full px-2 py-1">
                                                <div className="w-5 h-5 rounded-full overflow-hidden">
                                                    <LazyImage
                                                        src={getTagImagePath(tag.categoryPath, tag.filename)}
                                                        alt={tag.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <span className="text-xs ml-1.5 text-gray-700">{tag.name}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredImages.length === 0 && (
                    <div className="text-center text-gray-500 py-16">
                        <h2 className="text-2xl font-semibold">找不到結果</h2>
                        <p className="mt-2">請嘗試調整您的篩選條件。</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default LineFarm;