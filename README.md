# Real-Time Chat API (Backend)

API backend para un sistema de chat en tiempo real, desarrollada con **Node.js** y **Express**, encargada de la autenticación, autorización, persistencia de mensajes y comunicación en tiempo real mediante WebSockets.

Este backend está diseñado para trabajar con un frontend desacoplado.

---

## 🚀 Funcionalidades

- Registro e inicio de sesión de usuarios
- Autenticación mediante **JWT almacenado en cookies httpOnly**
- Autorización de endpoints protegidos con **express-jwt**
- Comunicación en tiempo real con **WebSockets**
- Persistencia de mensajes en base de datos
- Separación correcta de conversaciones (no se mezclan mensajes)
- Manejo de usuarios conectados
- Cierre de sesión (logout)
- Protección de endpoints sensibles

---

## 🛠️ Tecnologías utilizadas

- **Node.js**
- **Express**
- **MySQL**
- **JWT**
- **express-jwt**
- **WebSocket (ws)**
- **Multer**
- **dotenv**

---

## 🔐 Autenticación y seguridad

- El token JWT se almacena en una **cookie httpOnly**
- El token **no es accesible desde el frontend**
- Los endpoints protegidos utilizan **express-jwt** para validar el token
- Se valida la existencia del usuario antes de permitir acciones sensibles

---

## 🧩 WebSockets

- Manejo de conexiones en tiempo real
- Cada usuario se asocia a su sesión autenticada
- Los mensajes:
  - Se envían en tiempo real
  - Se almacenan en base de datos
  - Se recuperan al reconectar
- Las conversaciones están aisladas para evitar cruces de mensajes

## ⚠️ Funcionalidades pendientes / mejoras

- Recuperación de contraseña
- Perfil de usuario
- Configuración avanzada de usuario
- Mejor manejo de errores y logs
- Escalabilidad con namespaces o rooms (futuro)

---

## 📡 Arquitectura

- Backend desacoplado del frontend
- Comunicación vía HTTP y WebSockets

---

## 📌 Notas

Este proyecto fue desarrollado como práctica avanzada para comprender:
- Autenticación segura
- Comunicación en tiempo real
- Persistencia de datos
- Separación de responsabilidades entre frontend y backend

---

## 📄 Licencia

Proyecto de uso educativo.
