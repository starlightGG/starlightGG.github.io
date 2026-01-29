# 📖 Project Setup Manual

Follow these steps to connect your website to external services. 

---

## 🤖 AI Setup (Groq)
1. **Create Account:** Go to [console.groq.com](https://console.groq.com/keys).
2. **Generate Key:** Click "API Keys" and create a new one.
3. **Copy Key:** Copy the string starting with `gsk_...`.
4. **Key edit:** **IMPORTANT!** remove gsk_ and base64 encode the rest.
5. **Link AI:** Open `/txt/token.txt` in your repo and paste the key there.

---

## 📊 User Counter (PubNub)
1. **Register:** Visit [PubNub.com](http://pubnub.com/).
2. **App Instance:** Create an App titled **"User Counter"**.
3. **Keyset:** Locate your **Publish Key** and **Subscribe Key**.
4. **Presence:** In the "Presence" tab, enable **"Generate Leave on TCP FIN or RST"** for real-time tracking.
---

> [!CAUTION]
> **Important:** This is a manual for developers. Make sure you have your `index.html` open in a code editor like VS Code before starting.
> **Security:** Since this is a small project and doesn't have back servers, please refresh your PubNub and GROQ key every now and then!
