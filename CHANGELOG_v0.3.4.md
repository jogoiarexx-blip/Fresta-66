# FRESTA 66 — v0.3.4: física 3D da escadaria

Substituída a elevação aproximada por 18 superfícies de degraus reais (9 por lance), patamar intermediário e chegada ao segundo pavimento.
Colisão por cápsula com altura, passo máximo de 0,235 m, deslizamento ao bater em paredes e subdivisão de deslocamento para evitar atravessamentos.
Saída do 2º andar, inspeção, câmera, personagem, som, agachamento e retomada de saves passaram a usar pés em coordenada vertical.
Saves antigos reconstruídos pela geometria; os novos armazenam feetY sanitizado.
JavaScript versionado para GitHub Pages. Testes novos de subir/descer, atalhos, paredes e salvamento; CI inclui verificação de sintaxe do módulo.

Limites: esta revisão usa física por degraus e cápsula, não motor completo de corpos rígidos. Os capítulos ainda são cenas diferentes. Teste de jogabilidade visual com WebGL continua pendente.
