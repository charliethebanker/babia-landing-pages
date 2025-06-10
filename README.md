# BABIA Landing Pages

> 3 páginas de vendas diferentes para o curso BABIA da Isabel Digital

## 📋 Visão Geral

Este projeto contém 3 páginas de vendas completamente diferentes para o curso **BABIA - Bê-à-Bá da Inteligência Artificial** da Isabel Digital:

1. **Página Ultra Premium Tech** - Design futurista com animações 3D
2. **Página Storytelling Emocional** - Focada na jornada emocional estilo Lunae Academy  
3. **Página Minimalista** - Clean e focada 100% em conversão

## 🗂️ Estrutura do Projeto

```
babia-landing-pages/
├── assets/
│   ├── original/          # Imagens da página original (extrair manualmente)
│   ├── css/
│   │   └── common.css     # CSS comum para todas as páginas
│   ├── js/
│   │   └── common.js      # JavaScript comum otimizado
│   └── img/              # Imagens adicionais
├── docs/
│   └── assets-instructions.md  # Instruções para extrair assets
├── pagina-1-tech.html           # Página Ultra Premium Tech
├── pagina-2-storytelling.html   # Página Storytelling Emocional
├── pagina-3-minimalista.html    # Página Minimalista
└── README.md
```

## 🎯 Características das Páginas

### Página 1: Ultra Premium Tech (`pagina-1-tech.html`)
- **Conceito**: Futurista, high-tech, premium
- **Características**:
  - Animações 3D e partículas
  - Cursor personalizado interativo
  - Loading screen futurista
  - Efeitos holográficos
  - Cards 3D que rotacionam
  - Timeline interativo
  - Som ao hover (opcional)
  - Easter eggs (Konami code)

### Página 2: Storytelling Emocional (`pagina-2-storytelling.html`)
- **Conceito**: Emocional, inspirado na Lunae Academy
- **Características**:
  - Storytelling profundo
  - Cores quentes e acolhedoras
  - Animações suaves
  - Progress bar com corações
  - Música ambiente opcional
  - FAQ empático
  - Foco na transformação pessoal

### Página 3: Minimalista (`pagina-3-minimalista.html`)
- **Conceito**: Clean, direto, conversão rápida
- **Características**:
  - 95% espaço em branco
  - Apenas 3 cores
  - Zero animações desnecessárias
  - Countdown timer fixo
  - CTA sticky
  - A/B test ready
  - Performance máxima

## 🚀 Implementação Rápida

### 1. Extrair Assets da Página Original

**MUITO IMPORTANTE**: Antes de usar as páginas, extrair todas as imagens de https://www.isabeldigitall.pt/babia/

1. Abrir a página original no browser
2. Clicar com botão direito em cada imagem
3. "Guardar imagem como..." na pasta `assets/original/`
4. Seguir as instruções em `docs/assets-instructions.md`

### 2. Configurar Analytics

Descomentar e configurar nos arquivos HTML:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
<script>
  gtag('config', 'YOUR_GA_ID');
</script>

<!-- Facebook Pixel -->
<script>
  fbq('init', 'YOUR_PIXEL_ID');
</script>
```

### 3. Configurar WooCommerce

Substituir os links `#checkout` pelos URLs reais:
- `href="#checkout"` → `href="https://checkout.isabeldigitall.pt/babia"`

### 4. Upload e Teste

1. Fazer upload dos arquivos para o servidor
2. Testar em dispositivos diferentes
3. Verificar velocidade de carregamento
4. Testar formulários e links

## 🛠️ Conversão para WordPress/Elementor

### Opção 1: Elementor (Recomendado)

1. **Criar Nova Página no WordPress**
2. **Editar com Elementor**
3. **Copiar Secções HTML**:
   - Hero → Widget HTML do Elementor
   - Stats → Widget Contador
   - Testemunhos → Widget Galeria
   - CTA → Widget Botão
4. **Adicionar CSS Personalizado**:
   - Elementor > Avançado > CSS Personalizado
   - Copiar CSS relevante de cada página

### Opção 2: Child Theme

1. **Criar Child Theme**
2. **Adicionar Template Personalizado**:
   ```php
   <?php
   /* Template Name: BABIA Landing */
   get_header();
   // Incluir HTML da página escolhida
   get_footer();
   ?>
   ```
3. **Enqueue CSS e JS**:
   ```php
   wp_enqueue_style('babia-style', get_stylesheet_directory_uri() . '/babia.css');
   wp_enqueue_script('babia-script', get_stylesheet_directory_uri() . '/babia.js');
   ```

## 📱 Otimizações de Performance

### CSS
- ✅ Critical CSS inline
- ✅ Fontes do sistema para velocidade
- ✅ CSS minificado pronto
- ✅ Mobile-first approach

### JavaScript
- ✅ Vanilla JS (sem jQuery)
- ✅ Async loading
- ✅ Lazy loading de imagens
- ✅ Debounce/throttle em eventos

### Imagens
- ✅ Alt text em todas as imagens
- ✅ Loading lazy
- ✅ Placeholder otimizados
- ⚠️ **TODO**: Comprimir imagens originais

## 🔧 Configurações Avançadas

### A/B Testing (Página 3)

A página minimalista está preparada para A/B testing:

```javascript
// Versão A (rosa) ou B (verde)
setTestVersion('a'); // ou 'b'
```

### Analytics Avançados

O `common.js` inclui tracking de:
- Page views
- CTA clicks  
- Scroll depth
- Video events
- Form submissions
- Time on page
- Exit intent

### Countdown Timer Dinâmico

```javascript
// Definir data específica
BABIA.Countdown.init(element, '2024-12-31 23:59:59');

// Ou final do dia atual (padrão)
BABIA.Countdown.init(element);
```

## 📊 Métricas Esperadas

### Page Speed
- **Página 1**: ~3-4s (muitas animações)
- **Página 2**: ~2-3s (imagens otimizadas)  
- **Página 3**: ~1-2s (minimalista)

### Conversão
- **Página 1**: Impressionar → compra impulsiva
- **Página 2**: Convencer → compra emocional
- **Página 3**: Converter → compra racional

## 🐛 Troubleshooting

### Imagens não aparecem
- ✅ Verificar se todas as imagens foram extraídas
- ✅ Verificar paths relativos nos HTML
- ✅ Verificar permissões do servidor

### Animações não funcionam
- ✅ Verificar se JavaScript está ativo
- ✅ Testar em browser diferente
- ✅ Verificar console para erros

### Performance lenta
- ✅ Comprimir imagens
- ✅ Ativar GZIP no servidor
- ✅ Usar CDN para assets
- ✅ Minificar CSS/JS

## 📋 Checklist de Lançamento

### Antes do Go-Live
- [ ] Todas as imagens extraídas e otimizadas
- [ ] Analytics configurados
- [ ] Links de checkout funcionais
- [ ] Testado em Chrome, Firefox, Safari
- [ ] Testado em mobile e desktop
- [ ] Velocidade de carregamento < 3s
- [ ] SEO meta tags verificadas
- [ ] Formulários testados

### Após o Lançamento
- [ ] Monitorar analytics
- [ ] Testar taxa de conversão
- [ ] Otimizar baseado em dados
- [ ] A/B test diferentes versões
- [ ] Coletar feedback dos usuários

## 🔗 Links Úteis

- **Página Original**: https://www.isabeldigitall.pt/babia/
- **Instagram**: @isabeldigitall
- **Inspiração Lunae**: https://lunaeacademy-formacoes.com/sp/workshop-jesmonite/

## 💡 Próximos Passos

1. **Extrair todos os assets** da página original
2. **Escolher a página** que melhor se adequa ao público
3. **Implementar no WordPress** usando Elementor
4. **Configurar tracking** e analytics
5. **Fazer testes A/B** para otimizar conversão
6. **Monitorar métricas** e ajustar conforme necessário

## 📞 Suporte

Para questões sobre implementação:
1. Verificar este README
2. Consultar `docs/assets-instructions.md`
3. Verificar comentários no código HTML
4. Testar em ambiente local primeiro

---

**🎯 Objetivo**: Aumentar a conversão do curso BABIA através de landing pages otimizadas e profissionais.

**🚀 Resultado Esperado**: Páginas que convertem visitantes em alunas do curso BABIA, cada uma com abordagem diferente mas todas alinhadas com a marca da Isabel Digital.