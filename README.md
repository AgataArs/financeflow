# FinanceFlow 💰

Aplikacja do zarządzania finansami osobistymi z bazą danych w chmurze.

## ✨ Funkcje

- 🔐 **Logowanie i rejestracja** - każdy użytkownik ma swoje dane
- 💸 **Wydatki stałe vs zmienne** - rozdzielenie rachunków od codziennych wydatków
- 🎯 **Cele oszczędnościowe** - miesięczne lub roczne
- 🔥 **Guilt-Free Burn Tracker** - ile możesz wydać dzisiaj bez wyrzutów sumienia
- 📊 **Prognoza finansowa** - wykres kumulatywnych oszczędności
- 🛡️ **Poduszka bezpieczeństwa** - na ile miesięcy wystarczą Twoje oszczędności
- ☁️ **Dane w chmurze** - dostęp z każdego urządzenia

---

## 🚀 Instalacja

### Krok 1: Utwórz projekt w Supabase (darmowe)

1. Wejdź na **https://supabase.com** i załóż konto
2. Kliknij **"New Project"**
3. Wybierz nazwę i hasło do bazy danych
4. Poczekaj ~2 minuty aż projekt się utworzy

### Krok 2: Utwórz tabelę w bazie danych

1. W Supabase Dashboard → **SQL Editor**
2. Kliknij **"New query"**
3. Wklej ten kod i kliknij **"Run"**:

```sql
-- Tabela na dane użytkowników
CREATE TABLE user_finance_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Włącz Row Level Security (RLS)
ALTER TABLE user_finance_data ENABLE ROW LEVEL SECURITY;

-- Polityka: użytkownicy widzą tylko swoje dane
CREATE POLICY "Users can view own data" ON user_finance_data
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own data" ON user_finance_data
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own data" ON user_finance_data
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own data" ON user_finance_data
  FOR DELETE USING (auth.uid() = user_id);
```

### Krok 3: Pobierz klucze API

1. W Supabase Dashboard → **Settings** (ikona zębatki) → **API**
2. Skopiuj:
   - **Project URL** (np. `https://abc123.supabase.co`)
   - **anon public** key (długi ciąg znaków)

### Krok 4: Skonfiguruj aplikację

1. Rozpakuj archiwum `financeflow.zip`
2. Utwórz plik `.env` w głównym folderze:

```
VITE_SUPABASE_URL=https://twoj-projekt.supabase.co
VITE_SUPABASE_ANON_KEY=twoj-anon-key
```

### Krok 5: Uruchom aplikację

```bash
cd financeflow
npm install
npm run dev
```

Otwórz **http://localhost:5173**

---

## 🌐 Publikacja online (opcjonalne)

### Vercel (darmowe)

1. Wrzuć kod na GitHub
2. Wejdź na **https://vercel.com** i połącz z GitHubem
3. Dodaj zmienne środowiskowe:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy!

### Netlify (darmowe)

1. Wrzuć kod na GitHub
2. **https://netlify.com** → New site from Git
3. Dodaj zmienne środowiskowe w Site settings → Environment
4. Deploy!

---

## 📧 Konfiguracja emaili (opcjonalne)

Domyślnie Supabase wymaga potwierdzenia emaila. Żeby to wyłączyć:

1. Supabase Dashboard → **Authentication** → **Providers**
2. Kliknij na **Email**
3. Wyłącz **"Confirm email"**
4. Zapisz

---

## 🔒 Bezpieczeństwo

- Hasła są hashowane przez Supabase Auth
- Row Level Security (RLS) chroni dane użytkowników
- Każdy widzi tylko swoje dane
- Klucz `anon` jest bezpieczny do użycia w frontend

---

## 📁 Struktura projektu

```
financeflow/
├── src/
│   ├── components/     # Komponenty React
│   ├── contexts/       # AuthContext
│   ├── hooks/          # useFinanceData
│   ├── lib/            # Konfiguracja Supabase
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env                # Twoje klucze (nie commituj!)
├── .env.example        # Przykład
├── index.html
├── package.json
└── vite.config.js
```

---

## ❓ FAQ

**Q: Czy moje dane są bezpieczne?**
A: Tak! Supabase używa szyfrowania i Row Level Security. Każdy użytkownik widzi tylko swoje dane.

**Q: Ile to kosztuje?**
A: Supabase ma darmowy plan z 500MB bazy danych - wystarczy na tysiące użytkowników.

**Q: Czy mogę udostępnić aplikację znajomym?**
A: Tak! Każdy może założyć konto i mieć swoje własne dane.

---

## 🛠️ Rozwój

```bash
npm run dev      # Tryb deweloperski
npm run build    # Build produkcyjny
npm run preview  # Podgląd buildu
```

---

Made with ❤️ by FinanceFlow Team
