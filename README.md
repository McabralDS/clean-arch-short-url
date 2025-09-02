# 🔗 Clean Architecture URL Shortener

Um encurtador de URLs moderno construído com NestJS seguindo os princípios da Clean Architecture. Este projeto demonstra uma implementação prática de arquitetura limpa com separação clara de responsabilidades entre domínio, aplicação e infraestrutura.

## 🎯 Objetivo

Este projeto foi desenvolvido para demonstrar como implementar Clean Architecture em uma aplicação real, criando um serviço de encurtamento de URLs com funcionalidades completas de tracking e estatísticas.

## ✨ Funcionalidades

- **🔗 Encurtamento de URLs**: Converte URLs longas em versões curtas e fáceis de compartilhar
- **📊 Rastreamento de Cliques**: Conta automaticamente o número de acessos em cada URL encurtada
- **📈 Estatísticas Detalhadas**: Visualize métricas completas de cada URL criada
- **🔄 Redirecionamento Automático**: Redirecionamento HTTP 301 para a URL original
- **✅ Validação de URLs**: Verificação automática da validade das URLs fornecidas
- **🎲 Geração Inteligente**: Criação automática de códigos únicos entre 6-10 caracteres

## 🏗️ Arquitetura

O projeto segue os princípios da **Clean Architecture**, organizando o código em camadas bem definidas:

```
src/
├── url/
│   ├── domain/                 # 🎯 Camada de Domínio
│   │   ├── entities/           # Entidades de negócio
│   │   └── repositories/       # Contratos de repositório
│   ├── application/            # 🔄 Camada de Aplicação
│   │   └── use-cases/          # Casos de uso do sistema
│   │       ├── shorten-url/    # Encurtar URL
│   │       ├── redirect-to-original-url/  # Redirecionamento
│   │       └── get-url-stats/  # Obter estatísticas
│   └── infrastructure/         # 🔧 Camada de Infraestrutura
│       ├── controller/         # Controladores REST
│       ├── database/           # Persistência de dados
│       └── url.module.ts       # Módulo NestJS
```

### 📋 Camadas da Arquitetura

- **🎯 Domain Layer**: Contém as regras de negócio puras e entidades
- **🔄 Application Layer**: Orquestra os casos de uso e fluxos da aplicação
- **🔧 Infrastructure Layer**: Implementa detalhes técnicos como banco de dados e controllers

## 🚀 Tecnologias

- **[NestJS](https://nestjs.com/)** - Framework Node.js progressivo
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado do JavaScript
- **[TypeORM](https://typeorm.io/)** - ORM para TypeScript e JavaScript
- **[SQLite](https://www.sqlite.org/)** - Banco de dados leve e eficiente
- **[Better-SQLite3](https://github.com/WiseLibs/better-sqlite3)** - Driver SQLite otimizado

## 📦 Instalação

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Passos de Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/McabralDS/clean-arch-short-url.git
   cd clean-arch-short-url
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie a aplicação**
   ```bash
   # Desenvolvimento
   npm run start:dev
   
   # Produção
   npm run build
   npm run start:prod
   ```

4. **Acesse a aplicação**
   ```
   http://localhost:3000
   ```

## 🔌 API Endpoints

### 📝 Criar URL Encurtada

```http
POST /
Content-Type: application/json

{
  "originalUrl": "https://www.exemplo.com/url-muito-longa"
}
```

**Resposta:**
```json
{
  "originalUrl": "https://www.exemplo.com/url-muito-longa",
  "shortenedUrl": "abc123",
  "clicks": 0,
  "createdAt": "2025-09-02T10:30:00.000Z"
}
```

### 🔄 Redirecionamento

```http
GET /{shortenedUrl}
```

Redireciona automaticamente para a URL original e incrementa o contador de cliques.

### 📊 Obter Estatísticas

```http
GET /{shortenedUrl}/stats
```

**Resposta:**
```json
{
  "originalUrl": "https://www.exemplo.com/url-muito-longa",
  "shortenedUrl": "abc123",
  "clicks": 15,
  "createdAt": "2025-09-02T10:30:00.000Z"
}
```

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes e2e
npm run test:e2e

# Cobertura de testes
npm run test:cov

# Modo watch
npm run test:watch
```

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev      # Inicia com hot reload
npm run start:debug    # Inicia em modo debug

# Build e Produção
npm run build          # Compila o projeto
npm run start:prod     # Inicia versão de produção

# Qualidade de Código
npm run lint           # Executa ESLint
npm run format         # Formata código com Prettier

# Testes
npm run test           # Testes unitários
npm run test:e2e       # Testes end-to-end
npm run test:cov       # Cobertura de testes
```

## 📊 Banco de Dados

O projeto utiliza SQLite com a seguinte estrutura:

```sql
CREATE TABLE urls (
    shortenedUrl VARCHAR PRIMARY KEY,
    originalUrl VARCHAR NOT NULL,
    clicks INTEGER NOT NULL DEFAULT 0,
    createdAt VARCHAR NOT NULL
);
```

O banco de dados é criado automaticamente como `database.sqlite` na raiz do projeto.

## 🎨 Exemplos de Uso

### Via cURL

```bash
# Criar URL encurtada
curl -X POST http://localhost:3000 \
  -H "Content-Type: application/json" \
  -d '{"originalUrl": "https://github.com/McabralDS/clean-arch-short-url"}'

# Obter estatísticas
curl http://localhost:3000/abc123/stats
```

### Via JavaScript/Fetch

```javascript
// Criar URL encurtada
const response = await fetch('http://localhost:3000', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    originalUrl: 'https://github.com/McabralDS/clean-arch-short-url'
  })
});

const shortUrl = await response.json();
console.log(shortUrl);
```

## 🔧 Configuração

### Variáveis de Ambiente

```bash
# .env (opcional)
PORT=3000
```

### Configuração do Banco

A configuração do banco está em `src/database.config.ts` e pode ser personalizada conforme necessário.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença UNLICENSED. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

**McabralDS** - [GitHub](https://github.com/McabralDS)

---

<div align="center">

**⭐ Não esqueça de dar uma estrela se este projeto te ajudou! ⭐**

</div>
