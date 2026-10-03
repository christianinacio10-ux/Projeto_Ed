# Estoque de Campo

Controle do estoque que fica no depósito e do que está em poder dos técnicos. O arquivo para colar no Apps Script é o `Codigo.gs`: HTML, CSS e JavaScript vêm embutidos nele.

## Publicar

1. Abra [script.google.com](https://script.google.com) e crie um projeto.
2. Apague o conteúdo de `Código.gs` e cole o arquivo `Codigo.gs` inteiro.
3. **Implantar → Nova implantação → Aplicativo da Web**.
4. Executar como **Eu**. Acesso: qualquer conta Google, ou só o domínio da companhia.
5. Autorize a planilha. Na primeira abertura o script cria a planilha **Estoque de Campo** no Drive dessa conta. A tela não mostra o link dela.

A carga inicial já entra com os 48 itens do arquivo de setembro de 2026. Depósitos: Campinas — Ferramentas, Campinas — Equipamentos e Mococa. Nenhum técnico vem cadastrado.

## O que o estoque faz

O saldo é perpétuo: cada lançamento atualiza na hora e ganha um número (`MOV-000001`), com documento, motivo e quem operou.

| Lançamento | Efeito |
| --- | --- |
| Entrada | Some no depósito. Se informar o custo, recalcula o custo médio. |
| Saída | Sai do depósito e fica com o técnico. |
| Devolução | Volta do técnico para o depósito. |
| Consumo | Baixa consumível usado em OS. Durável não passa por aqui. |
| Baixa | Perda, avaria ou extravio, com motivo. |
| Transferência | De um local para outro, sem consumir. |
| Lote | Várias transferências de uma origem para um destino, de uma vez. Dá para copiar o saldo inteiro da origem. |
| Contagem | A diferença entre o físico e o livro vira ajuste. |

O ponto de pedido olha só a soma dos depósitos. O que está com o técnico já saiu do disponível: durável é custódia e consumível é estoque avançado. Quando o depósito chega no ponto, a quantidade sugerida repõe até duas vezes esse ponto.

A curva ABC separa os itens pelo valor parado em estoque. Dá para sugerir ponto de pedido (20% do saldo do depósito, no mínimo 1) só nos itens que ainda não têm ponto.

O CSV de origem pode ser importado de novo em Cadastro. Colunas usadas: SKU interno, produto, categoria, NCM, estoque atual, unidade, custo e depósito. Se marcar o lançamento de saldo, a diferença daquele depósito vira ajuste. O que está com o técnico não é apagado.

## Acesso

A primeira abertura pede nome, e-mail e senha. Esse acesso nasce como **gestor**. A senha não fica legível na planilha: a aba Usuarios guarda só o hash e o sal.

| Perfil | O que faz |
| --- | --- |
| Técnico | Saída para técnico, devolução, consumo, transferência e contagem. Vê posição e histórico. |
| Gestor | Tudo do técnico, mais entrada, baixa, cadastro, importação, ponto de pedido, locais e a leitura de gestão. Cria os outros acessos. |

A sessão dura 12 horas neste navegador. Baixa, entrada e qualquer exclusão de estoque ficam só com a gestão. A contagem continua com o técnico, porque a diferença física é conferência, não descarte.

## Leitura da gestão

O painel do gestor calcula, a partir do livro:

- nível de serviço: itens com ponto de pedido que ainda estão acima dele no depósito
- giro e cobertura dos últimos 30 dias, só com consumo e baixa (saída para o campo continua sendo patrimônio)
- perda do período e ajuste líquido de contagem
- Pareto dos oito itens de maior valor
- movimento semanal de entrada, saída, consumo e baixa
- estoque parado: sem saída, consumo ou baixa em 45 dias

Sem consumo real, giro e cobertura aparecem em aberto. O gráfico não inventa semana.
