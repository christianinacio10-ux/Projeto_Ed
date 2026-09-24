/**
 * Estoque de Campo — um único arquivo para o Apps Script.
 *
 * Como publicar:
 * 1. script.google.com → Novo projeto.
 * 2. Apague o conteúdo de Código.gs e cole ESTE arquivo inteiro.
 * 3. Implantar → Nova implantação → Aplicativo da Web.
 * 4. Executar como: Eu. Quem tem acesso: qualquer pessoa com uma conta Google
 *    (ou só o domínio, se a companhia usar Google Workspace).
 * 5. Autorize a planilha. A primeira abertura cria "Estoque de Campo" no Drive
 *    dessa conta. O link "Abrir planilha" no rodapé leva até ela.
 *
 * A tela (HTML + JavaScript) está embutida em paginaHtml_().
 * Não há logo. Depósitos do CSV de origem entram com nome de local, sem marca.
 */

var APP = {
  nome: 'Estoque de Campo',
  versao: '1.0.0'
};

var SEMENTE_LOCAIS = [
  { id: 'dep-campinas-ferramentas', nome: 'Campinas — Ferramentas', tipo: 'DEPOSITO' },
  { id: 'dep-campinas-equipamentos', nome: 'Campinas — Equipamentos', tipo: 'DEPOSITO' },
  { id: 'dep-mococa', nome: 'Mococa', tipo: 'DEPOSITO' }
];

var SEMENTE_ITENS = [{"sku":"P001","produto":"Álcool Isopropílico 1 Litro","categoria":"Consumível","unidade":"Un","ncm":"2905.12.20","custo":40.8,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P002","produto":"Alicate Bico 1/2 C.West Prof 6” 3098","categoria":"Durável","unidade":"Un","ncm":"8203.20.10","custo":31.74,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P003","produto":"Alicate Corte Diag. Gedore-Red Isolado 6”","categoria":"Durável","unidade":"Un","ncm":"8203.20.10","custo":62.32,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P004","produto":"Alicate Eletric. Sata Univ. 8” AM.ST75104L","categoria":"Durável","unidade":"Un","ncm":"8203.20.10","custo":88.48,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P005","produto":"Alicate Eletricgedore-Red Univ 8” AM450","categoria":"Durável","unidade":"Un","ncm":"8203.20.10","custo":124.0,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P006","produto":"Protetor Solar Facial Antioleosidade","categoria":"Consumível","unidade":"Un","ncm":"3304.99.90","custo":45.59,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P007","produto":"Badisco Digital Com Identificador de Chamadas","categoria":"Durável","unidade":"Un","ncm":"8517.14.32","custo":71.44,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P008","produto":"Balde de lona e couro sintetico 280 x 260 mm","categoria":"Durável","unidade":"Un","ncm":"4202.22.20","custo":35.34,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P009","produto":"Bloqueador Descensor Autoblocante Para 9-12mm Anti-panico","categoria":"Durável","unidade":"Un","ncm":"7610.10.00","custo":226.39,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P010","produto":"Bolsa em lona e couro sintetico 450 x 300 x 200 mm-F103","categoria":"Durável","unidade":"Un","ncm":"4202.22.20","custo":80.77,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P011","produto":"Camera Boroscopica Endoscopica 5m Inspecao Tubos 4k","categoria":"Durável","unidade":"Un","ncm":"9031.49.90","custo":255.41,"qtd":6.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P012","produto":"Capa de Chuva Transparente","categoria":"Consumível","unidade":"Un","ncm":"6201.40.00","custo":23.41,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P013","produto":"Capacete C/Prosafety Branco","categoria":"Durável","unidade":"Un","ncm":"6506.10.90","custo":26.05,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P014","produto":"Cavalete Para Bobina Drop-Drobavel","categoria":"Durável","unidade":"Un","ncm":"8302.49.00","custo":129.62,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P015","produto":"Chave de fenda Prof. Tram. Pro Cart. C/5P","categoria":"Durável","unidade":"Un","ncm":"8205.40.00","custo":73.04,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P016","produto":"Chave de Precisão Eda C/Haste 23p 9jf","categoria":"Durável","unidade":"Un","ncm":"8205.40.00","custo":54.56,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P017","produto":"Chave Triangular Universal Elevador Chave Tr","categoria":"Durável","unidade":"Un","ncm":"8205.59.00","custo":20.0,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P018","produto":"Cone Rigido Plastcor Pl. Pr/Am.50cm","categoria":"Durável","unidade":"Un","ncm":"3926.90.90","custo":26.72,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P019","produto":"Detector Tensão Hikari 30a1000v hkvoltii","categoria":"Durável","unidade":"Un","ncm":"9030.33.19","custo":72.32,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P020","produto":"Gg 5600 Ec Cinto Pq3 Telecom","categoria":"Durável","unidade":"Un","ncm":"6307.20.00","custo":227.38,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P021","produto":"Dg 8010 - Talabarte F-Y-55/17/Elastico/Abs","categoria":"Durável","unidade":"PC","ncm":"6307.20.00","custo":175.06,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P022","produto":"Dg 9200 - Talabarte de Posicionamento","categoria":"Durável","unidade":"PC","ncm":"6307.20.00","custo":189.63,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P023","produto":"Escada de Aluminio 3.60x6,00m","categoria":"Durável","unidade":"Un","ncm":"7616.99.00","custo":1062.37,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P024","produto":"Escada de Aluminio 1,90x3,20m","categoria":"Durável","unidade":"Un","ncm":"7616.99.00","custo":678.0,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P025","produto":"Estilete","categoria":"Durável","unidade":"Un","ncm":"8211.93.20","custo":3.89,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P026","produto":"Extensao Eletrica 15 metros","categoria":"Durável","unidade":"Un","ncm":"8544.49.00","custo":48.98,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P027","produto":"Fita Eureka","categoria":"Durável","unidade":"PC","ncm":"5806.32.00","custo":114.9,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P028","produto":"Fita Zebrada","categoria":"Consumível","unidade":"Un","ncm":"3918.90.00","custo":16.73,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P029","produto":"Impressora Hp Smart Tank 210 com tanque de tinta colorida","categoria":"Durável","unidade":"Un","ncm":"","custo":0.0,"qtd":1.0,"depositoId":"dep-campinas-equipamentos"},{"sku":"P030","produto":"Jugular Para Capacete","categoria":"Durável","unidade":"Un","ncm":"6507.00.00","custo":3.05,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P031","produto":"Kit Ferramentas Ftth","categoria":"Durável","unidade":"CJ","ncm":"9030.40.90","custo":274.17,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P032","produto":"Leitor de código de barra com fio resolução 4m","categoria":"Durável","unidade":"Un","ncm":"","custo":0.0,"qtd":1.0,"depositoId":"dep-campinas-equipamentos"},{"sku":"P033","produto":"Lenço Anti-Estático","categoria":"Consumível","unidade":"Un","ncm":"4818.90.90","custo":52.24,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P034","produto":"Luva de Vaqueta Petrol Plastcor","categoria":"Durável","unidade":"Un","ncm":"4203.29.00","custo":41.36,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P035","produto":"Luva Malh.Acril. Trico Az Embor.","categoria":"Durável","unidade":"Un","ncm":"6116.10.00","custo":24.76,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P036","produto":"Luva Malha Acrilon Pr Trico C/Pigm Cart","categoria":"Durável","unidade":"Un","ncm":"6116.10.00","custo":6.96,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P037","produto":"Maquina de Citar Poste Fusimec","categoria":"Durável","unidade":"Un","ncm":"8465.94.00","custo":136.02,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P038","produto":"Máscara de Valvula","categoria":"Consumível","unidade":"KI","ncm":"6307.90.10","custo":51.31,"qtd":1.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P039","produto":"Mini Etiqueta Termica Impressora Bluetooth 58mm","categoria":"Durável","unidade":"Un","ncm":"","custo":0.0,"qtd":1.0,"depositoId":"dep-campinas-equipamentos"},{"sku":"P040","produto":"Flanela Cor Laranja Limpeza Geral 12 Unidades","categoria":"Consumível","unidade":"KI","ncm":"6307.10.00","custo":19.99,"qtd":3.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P041","produto":"Nivelador de Escada","categoria":"Durável","unidade":"Un","ncm":"8429.20.10","custo":51.19,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P042","produto":"Nivelador de Escada","categoria":"Durável","unidade":"Un","ncm":"4418.99.00","custo":70.22,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P043","produto":"Notebook lenovo ideapad slim 3 8gb 256gb","categoria":"Durável","unidade":"Un","ncm":"","custo":0.0,"qtd":1.0,"depositoId":"dep-campinas-equipamentos"},{"sku":"P044","produto":"Oculos Kalipso Leopardo Cz","categoria":"Durável","unidade":"Un","ncm":"9004.90.20","custo":7.15,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P045","produto":"Oculos Kalipso Leopardo Incol","categoria":"Durável","unidade":"Un","ncm":"9004.90.20","custo":7.15,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P046","produto":"Passa Fio Nylon Proaqua","categoria":"Durável","unidade":"Un","ncm":"7312.10.90","custo":44.38,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P047","produto":"Pistola de Solicone","categoria":"Durável","unidade":"Un","ncm":"8516.79.90","custo":28.11,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"},{"sku":"P048","produto":"Teste Volt Brasf Digital 12a220v 8187","categoria":"Durável","unidade":"Un","ncm":"9030.33.90","custo":9.9,"qtd":15.0,"depositoId":"dep-campinas-ferramentas"}];

var CAMPOS_ITENS = [
  ['sku', 'SKU'],
  ['produto', 'Produto'],
  ['categoria', 'Categoria'],
  ['unidade', 'Unidade'],
  ['ncm', 'NCM'],
  ['custo', 'Custo'],
  ['minimo', 'Ponto de pedido'],
  ['ativo', 'Ativo']
];

var CAMPOS_LOCAIS = [
  ['id', 'ID'],
  ['nome', 'Nome'],
  ['tipo', 'Tipo'],
  ['ativo', 'Ativo']
];

var CAMPOS_SALDOS = [
  ['sku', 'SKU'],
  ['localId', 'Local'],
  ['qtd', 'Quantidade']
];

var CAMPOS_MOV = [
  ['id', 'ID'],
  ['quando', 'Quando'],
  ['tipo', 'Tipo'],
  ['sku', 'SKU'],
  ['qtd', 'Quantidade'],
  ['direcao', 'Direcao'],
  ['origemId', 'Origem'],
  ['destinoId', 'Destino'],
  ['documento', 'Documento'],
  ['motivo', 'Motivo'],
  ['usuario', 'Usuario'],
  ['custo', 'Custo'],
  ['valor', 'Valor'],
  ['obs', 'Obs']
];

var ROTULO_TIPO = {
  ENTRADA: 'Entrada',
  SAIDA: 'Saída',
  DEVOLUCAO: 'Devolução',
  CONSUMO: 'Consumo',
  BAIXA: 'Baixa',
  TRANSFERENCIA: 'Transferência',
  AJUSTE: 'Ajuste',
  SALDO_INICIAL: 'Saldo inicial'
};

var MENSAGEM_TIPO = {
  ENTRADA: 'Entrada lançada no depósito.',
  SAIDA: 'Saída lançada para o técnico.',
  DEVOLUCAO: 'Devolução lançada no depósito.',
  CONSUMO: 'Consumo lançado.',
  BAIXA: 'Baixa lançada.',
  TRANSFERENCIA: 'Transferência lançada.',
  AJUSTE: 'Ajuste de contagem lançado.',
  SALDO_INICIAL: 'Saldo inicial lançado.'
};


/* ===================================================================== domínio */

function semAcento_(texto) {
  return String(texto || '').toLowerCase()
    .replace(/[áàâã]/g, 'a')
    .replace(/[éê]/g, 'e')
    .replace(/í/g, 'i')
    .replace(/[óôõ]/g, 'o')
    .replace(/ú/g, 'u')
    .replace(/ç/g, 'c');
}

function slug_(texto) {
  return semAcento_(texto).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'local';
}

function arredQtd_(valor) {
  return Math.round((Number(valor) || 0) * 1000) / 1000;
}

function arredDinheiro_(valor) {
  return Math.round((Number(valor) || 0) * 10000) / 10000;
}

function parseNumeroBr_(valor) {
  if (typeof valor === 'number') return isFinite(valor) ? valor : 0;
  var s = String(valor === null || valor === undefined ? '' : valor).trim();
  if (!s || s === '-' || s === '—') return 0;
  s = s.replace(/\s/g, '');
  if (s.indexOf(',') >= 0) s = s.replace(/\./g, '').replace(',', '.');
  var n = Number(s);
  return isFinite(n) ? n : 0;
}

function celulaInformada_(valor) {
  var s = String(valor === null || valor === undefined ? '' : valor).trim();
  return s !== '' && s !== '-' && s !== '—';
}

function flagAtivo_(valor) {
  var s = String(valor === null || valor === undefined ? '1' : valor).trim().toLowerCase();
  if (s === '0' || s === 'false' || s === 'nao' || s === 'não' || s === 'inativo') return '0';
  return '1';
}

function normalizarCategoria_(valor) {
  var s = semAcento_(valor).trim();
  if (!s) return 'Durável';
  if (s.indexOf('nao') >= 0 || s.indexOf('consum') >= 0) return 'Consumível';
  return 'Durável';
}

function normalizarDeposito_(bruto) {
  var s = String(bruto || '').replace(/\s+/g, ' ').trim();
  if (!s) return null;
  var n = semAcento_(s);
  if (n.indexOf('ferramenta') >= 0) {
    return { id: 'dep-campinas-ferramentas', nome: 'Campinas — Ferramentas', tipo: 'DEPOSITO' };
  }
  if (n.indexOf('mococa') >= 0) {
    return { id: 'dep-mococa', nome: 'Mococa', tipo: 'DEPOSITO' };
  }
  if (n.indexOf('tempo') >= 0) {
    return { id: 'dep-campinas-equipamentos', nome: 'Campinas — Equipamentos', tipo: 'DEPOSITO' };
  }
  if (/\bclaro\b/.test(n) || /\btreze\b/.test(n)) return null;
  var nome = s.replace(/^unidade\s+/i, '').replace(/\s*-\s*/g, ' — ').trim();
  return { id: 'dep-' + slug_(nome), nome: nome, tipo: 'DEPOSITO' };
}

function copiarItem_(item) {
  return {
    sku: String(item.sku || '').trim(),
    produto: String(item.produto || '').trim(),
    categoria: normalizarCategoria_(item.categoria),
    unidade: String(item.unidade || 'Un').trim() || 'Un',
    ncm: String(item.ncm || '').trim(),
    custo: arredDinheiro_(parseNumeroBr_(item.custo)),
    minimo: arredQtd_(parseNumeroBr_(item.minimo)),
    ativo: flagAtivo_(item.ativo === undefined ? '1' : item.ativo)
  };
}

function copiarLocal_(local) {
  var tipo = String(local.tipo || '').toUpperCase() === 'TECNICO' ? 'TECNICO' : 'DEPOSITO';
  return {
    id: String(local.id || '').trim(),
    nome: String(local.nome || '').trim(),
    tipo: tipo,
    ativo: flagAtivo_(local.ativo === undefined ? '1' : local.ativo)
  };
}

function acharItem_(itens, sku) {
  var alvo = String(sku || '').trim().toUpperCase();
  for (var i = 0; i < itens.length; i++) {
    if (String(itens[i].sku).toUpperCase() === alvo) return itens[i];
  }
  return null;
}

function localPorId_(locais, id) {
  var alvo = String(id || '');
  for (var i = 0; i < locais.length; i++) {
    if (locais[i].id === alvo) return locais[i];
  }
  return null;
}

function exigirLocalAtivo_(locais, id) {
  var local = localPorId_(locais, id);
  if (!local) throw new Error('Local não encontrado.');
  if (local.ativo !== '1') throw new Error('O local "' + local.nome + '" está inativo.');
  return local;
}

function saldoDe_(saldos, sku, localId) {
  for (var i = 0; i < saldos.length; i++) {
    if (saldos[i].sku === sku && saldos[i].localId === localId) return Number(saldos[i].qtd) || 0;
  }
  return 0;
}

function setSaldo_(saldos, sku, localId, qtd) {
  var q = arredQtd_(qtd);
  for (var i = 0; i < saldos.length; i++) {
    if (saldos[i].sku === sku && saldos[i].localId === localId) {
      saldos[i].qtd = q;
      return;
    }
  }
  saldos.push({ sku: sku, localId: localId, qtd: q });
}

function somarSaldo_(saldos, sku, localId, qtd) {
  setSaldo_(saldos, sku, localId, saldoDe_(saldos, sku, localId) + qtd);
}

function limparSaldos_(saldos) {
  return saldos.filter(function (s) { return s.qtd > 0.0001; }).map(function (s) {
    return { sku: s.sku, localId: s.localId, qtd: arredQtd_(s.qtd) };
  });
}

function textoQtd_(n) {
  var x = arredQtd_(n);
  if (Math.abs(x - Math.round(x)) < 0.0001) return String(Math.round(x));
  return String(x).replace('.', ',');
}

function baixarSaldo_(saldos, item, local, qtd) {
  var tem = saldoDe_(saldos, item.sku, local.id);
  if (tem + 0.0001 < qtd) {
    throw new Error(
      'Saldo insuficiente em ' + local.nome + ': disponível ' +
      textoQtd_(tem) + ' ' + item.unidade + ', pedido ' + textoQtd_(qtd) + '.'
    );
  }
  setSaldo_(saldos, item.sku, local.id, tem - qtd);
}

function exigirQtd_(qtd) {
  if (!(qtd > 0)) throw new Error('Informe uma quantidade maior que zero.');
}

function baseDe_(itens, locais, saldos, seq) {
  return { itens: itens, locais: locais, saldos: limparSaldos_(saldos), seq: seq };
}

function aplicarMovimento_(base, pedido, usuario, quando) {
  if (!pedido || !pedido.tipo) throw new Error('Informe o tipo de movimentação.');
  var tipo = String(pedido.tipo).toUpperCase();
  var itens = (base.itens || []).map(copiarItem_);
  var locais = (base.locais || []).map(copiarLocal_);
  var saldos = (base.saldos || []).map(function (s) {
    return { sku: String(s.sku), localId: String(s.localId), qtd: arredQtd_(s.qtd) };
  });
  var item = acharItem_(itens, pedido.sku);
  if (!item) throw new Error('Item não encontrado.');
  if (item.ativo !== '1' && tipo !== 'AJUSTE') {
    throw new Error('Item inativo. Reative no cadastro antes de movimentar.');
  }

  var origem = pedido.origemId ? exigirLocalAtivo_(locais, pedido.origemId) : null;
  var destino = pedido.destinoId ? exigirLocalAtivo_(locais, pedido.destinoId) : null;
  var qtd = arredQtd_(pedido.qtd);
  var direcao = '';
  var custoMov = item.custo;

  if (tipo === 'ENTRADA' || tipo === 'SALDO_INICIAL') {
    if (!destino || destino.tipo !== 'DEPOSITO') throw new Error('Entrada só entra em depósito.');
    exigirQtd_(qtd);
    if (tipo === 'ENTRADA') {
      var informado = arredDinheiro_(parseNumeroBr_(pedido.custo));
      if (informado > 0) {
        var antes = saldoDe_(saldos, item.sku, destino.id);
        item.custo = arredDinheiro_(((antes * item.custo) + (qtd * informado)) / (antes + qtd));
        custoMov = informado;
      }
    }
    somarSaldo_(saldos, item.sku, destino.id, qtd);
    direcao = 'ENTRA';
  } else if (tipo === 'SAIDA') {
    if (!origem || origem.tipo !== 'DEPOSITO') throw new Error('Saída sai de um depósito.');
    if (!destino || destino.tipo !== 'TECNICO') throw new Error('Saída vai para um técnico. Entre depósitos, use transferência.');
    exigirQtd_(qtd);
    baixarSaldo_(saldos, item, origem, qtd);
    somarSaldo_(saldos, item.sku, destino.id, qtd);
    direcao = 'SAI';
  } else if (tipo === 'DEVOLUCAO') {
    if (!origem || origem.tipo !== 'TECNICO') throw new Error('Devolução sai do técnico.');
    if (!destino || destino.tipo !== 'DEPOSITO') throw new Error('Devolução volta para um depósito.');
    exigirQtd_(qtd);
    baixarSaldo_(saldos, item, origem, qtd);
    somarSaldo_(saldos, item.sku, destino.id, qtd);
    direcao = 'ENTRA';
  } else if (tipo === 'CONSUMO') {
    if (item.categoria !== 'Consumível') {
      throw new Error('Item durável não se consome. Use devolução para voltar ao depósito ou baixa em caso de perda, avaria ou extravio.');
    }
    if (!origem) throw new Error('Informe de onde sai o consumo.');
    exigirQtd_(qtd);
    baixarSaldo_(saldos, item, origem, qtd);
    direcao = 'SAI';
    destino = null;
  } else if (tipo === 'BAIXA') {
    if (!origem) throw new Error('Informe de onde sai a baixa.');
    exigirQtd_(qtd);
    if (String(pedido.motivo || '').trim().length < 3) {
      throw new Error('Descreva o motivo da baixa (avaria, extravio ou obsolescência).');
    }
    baixarSaldo_(saldos, item, origem, qtd);
    direcao = 'SAI';
    destino = null;
  } else if (tipo === 'TRANSFERENCIA') {
    if (!origem || !destino) throw new Error('Informe origem e destino.');
    if (origem.id === destino.id) throw new Error('Origem e destino precisam ser diferentes.');
    exigirQtd_(qtd);
    baixarSaldo_(saldos, item, origem, qtd);
    somarSaldo_(saldos, item.sku, destino.id, qtd);
    direcao = 'SAI';
  } else if (tipo === 'AJUSTE') {
    var localAjuste = origem || destino;
    if (!localAjuste && pedido.localId) localAjuste = exigirLocalAtivo_(locais, pedido.localId);
    if (!localAjuste) throw new Error('Informe o local da contagem.');
    if (pedido.fisica === undefined || pedido.fisica === null || pedido.fisica === '') {
      throw new Error('Informe a quantidade contada.');
    }
    var fisica = arredQtd_(parseNumeroBr_(pedido.fisica));
    if (fisica < 0) throw new Error('A quantidade contada não pode ser negativa.');
    var livro = saldoDe_(saldos, item.sku, localAjuste.id);
    var delta = arredQtd_(fisica - livro);
    if (Math.abs(delta) < 0.0005) {
      return { base: baseDe_(itens, locais, saldos, Number(base.seq) || 0), movimento: null };
    }
    setSaldo_(saldos, item.sku, localAjuste.id, fisica);
    qtd = Math.abs(delta);
    direcao = delta > 0 ? 'ENTRA' : 'SAI';
    origem = direcao === 'SAI' ? localAjuste : null;
    destino = direcao === 'ENTRA' ? localAjuste : null;
  } else {
    throw new Error('Tipo de movimentação desconhecido.');
  }

  var seq = (Number(base.seq) || 0) + 1;
  var movimento = {
    id: 'MOV-' + ('000000' + seq).slice(-6),
    quando: String(quando || ''),
    tipo: tipo,
    sku: item.sku,
    qtd: arredQtd_(qtd),
    direcao: direcao,
    origemId: origem ? origem.id : '',
    destinoId: destino ? destino.id : '',
    documento: String(pedido.documento || '').trim().slice(0, 60),
    motivo: String(pedido.motivo || '').trim().slice(0, 180),
    usuario: String(usuario || ''),
    custo: arredDinheiro_(custoMov),
    valor: arredDinheiro_(qtd * custoMov),
    obs: String(pedido.obs || '').trim().slice(0, 180)
  };

  return { base: baseDe_(itens, locais, saldos, seq), movimento: movimento };
}

function classificarAbc_(linhas) {
  var ordenadas = linhas.slice().sort(function (a, b) {
    return (Number(b.valor) || 0) - (Number(a.valor) || 0);
  });
  var total = 0;
  ordenadas.forEach(function (l) { total += Math.max(0, Number(l.valor) || 0); });
  var acum = 0;
  var mapa = {};
  ordenadas.forEach(function (l) {
    var v = Math.max(0, Number(l.valor) || 0);
    var classe = 'C';
    if (total > 0 && v > 0) {
      var inicio = acum / total;
      acum += v;
      if (inicio < 0.8) classe = 'A';
      else if (inicio < 0.95) classe = 'B';
      else classe = 'C';
    }
    mapa[l.sku] = classe;
  });
  return mapa;
}

function statusPosicao_(qtdDeposito, minimo) {
  var q = Number(qtdDeposito) || 0;
  var m = Number(minimo) || 0;
  if (m <= 0) return q > 0 ? 'sem_ponto' : 'zerado';
  if (q <= m) return 'abaixo';
  return 'ok';
}

function sugestaoCompra_(qtdDeposito, minimo) {
  var m = Number(minimo) || 0;
  var q = Number(qtdDeposito) || 0;
  if (m <= 0 || q > m) return 0;
  return arredQtd_(Math.max(0, (m * 2) - q));
}

function sugerirMinimo_(qtdDeposito) {
  var q = Number(qtdDeposito) || 0;
  if (q <= 0) return 0;
  return Math.max(1, Math.ceil(q * 0.2 - 1e-9));
}

function montarPosicao_(base) {
  var itens = (base.itens || []).map(copiarItem_);
  var locais = (base.locais || []).map(copiarLocal_);
  var saldos = base.saldos || [];
  var porId = {};
  locais.forEach(function (l) { porId[l.id] = l; });

  var ativosValor = itens.filter(function (i) { return i.ativo === '1'; }).map(function (item) {
    var qtd = 0;
    saldos.forEach(function (s) {
      if (s.sku === item.sku) qtd += Number(s.qtd) || 0;
    });
    return { sku: item.sku, valor: qtd * (Number(item.custo) || 0) };
  });
  var abc = classificarAbc_(ativosValor);

  var linhas = itens.map(function (item) {
    var qtdDeposito = 0;
    var qtdTecnico = 0;
    var detalhe = [];
    saldos.forEach(function (s) {
      if (s.sku !== item.sku) return;
      var q = Number(s.qtd) || 0;
      if (!(q > 0)) return;
      var local = porId[s.localId];
      var tipo = local ? local.tipo : 'DEPOSITO';
      if (tipo === 'TECNICO') qtdTecnico += q;
      else qtdDeposito += q;
      detalhe.push({
        id: s.localId,
        nome: local ? local.nome : s.localId,
        tipo: tipo,
        qtd: arredQtd_(q)
      });
    });
    qtdDeposito = arredQtd_(qtdDeposito);
    qtdTecnico = arredQtd_(qtdTecnico);
    return {
      sku: item.sku,
      produto: item.produto,
      categoria: item.categoria,
      unidade: item.unidade,
      ncm: item.ncm,
      custo: item.custo,
      minimo: item.minimo,
      ativo: item.ativo,
      classeAbc: item.ativo === '1' ? (abc[item.sku] || 'C') : '',
      qtdDeposito: qtdDeposito,
      qtdTecnico: qtdTecnico,
      qtdTotal: arredQtd_(qtdDeposito + qtdTecnico),
      valor: arredDinheiro_((qtdDeposito + qtdTecnico) * item.custo),
      status: statusPosicao_(qtdDeposito, item.minimo),
      sugestao: sugestaoCompra_(qtdDeposito, item.minimo),
      locais: detalhe
    };
  });

  return { linhas: linhas, locais: locais, abc: resumirAbc_(linhas) };
}

function resumirAbc_(linhas) {
  var totalValor = 0;
  linhas.forEach(function (l) {
    if (l.ativo === '1') totalValor += Number(l.valor) || 0;
  });
  return ['A', 'B', 'C'].map(function (classe) {
    var n = 0;
    var valor = 0;
    linhas.forEach(function (l) {
      if (l.ativo === '1' && l.classeAbc === classe) {
        n++;
        valor += Number(l.valor) || 0;
      }
    });
    return {
      classe: classe,
      itens: n,
      valor: arredDinheiro_(valor),
      pct: totalValor > 0 ? Math.round((valor / totalValor) * 1000) / 10 : 0
    };
  });
}

function nomeLocal_(base, id) {
  if (!id) return '';
  var local = localPorId_(base.locais || [], id);
  return local ? local.nome : String(id);
}

function enriquecerMov_(mov, base) {
  var item = acharItem_(base.itens || [], mov.sku);
  var qtd = Number(mov.qtd) || 0;
  var assinada = mov.direcao === 'SAI' && mov.tipo === 'AJUSTE' ? -qtd : qtd;
  return {
    id: mov.id,
    quando: String(mov.quando || ''),
    tipo: mov.tipo,
    tipoRotulo: ROTULO_TIPO[mov.tipo] || mov.tipo,
    sku: mov.sku,
    produto: item ? item.produto : mov.sku,
    unidade: item ? item.unidade : '',
    qtd: qtd,
    direcao: mov.direcao || '',
    qtdAssinada: mov.tipo === 'AJUSTE' ? (mov.direcao === 'SAI' ? -qtd : qtd) : qtd,
    origem: nomeLocal_(base, mov.origemId),
    destino: nomeLocal_(base, mov.destinoId),
    documento: mov.documento || '',
    motivo: mov.motivo || '',
    usuario: mov.usuario || '',
    valor: arredDinheiro_(mov.valor),
    assinada: assinada
  };
}

function parseQuando_(texto) {
  if (texto instanceof Date && !isNaN(texto.getTime())) return texto.getTime();
  var s = String(texto || '').trim().replace(' ', 'T');
  var ms = Date.parse(s);
  return isNaN(ms) ? 0 : ms;
}

function montarPainel_(base, movimentos, agoraMs) {
  var pos = montarPosicao_(base);
  var ativos = pos.linhas.filter(function (l) { return l.ativo === '1'; });
  var valorDeposito = 0;
  var valorTecnicos = 0;
  ativos.forEach(function (l) {
    valorDeposito += l.qtdDeposito * l.custo;
    valorTecnicos += l.qtdTecnico * l.custo;
  });

  var alertas = ativos.filter(function (l) { return l.status === 'abaixo'; }).sort(function (a, b) {
    return (b.sugestao * b.custo) - (a.sugestao * a.custo);
  }).map(function (l) {
    var deps = l.locais.filter(function (x) { return x.tipo !== 'TECNICO'; }).map(function (x) { return x.nome; });
    return {
      sku: l.sku,
      produto: l.produto,
      unidade: l.unidade,
      qtdDeposito: l.qtdDeposito,
      minimo: l.minimo,
      sugestao: l.sugestao,
      classeAbc: l.classeAbc,
      depositos: deps.join(', ') || 'sem saldo no depósito'
    };
  });

  var depositos = pos.locais.filter(function (l) { return l.tipo === 'DEPOSITO' && l.ativo === '1'; }).map(function (dep) {
    var valor = 0;
    var skus = 0;
    ativos.forEach(function (item) {
      item.locais.forEach(function (loc) {
        if (loc.id === dep.id && loc.qtd > 0) {
          valor += loc.qtd * item.custo;
          skus++;
        }
      });
    });
    return { id: dep.id, nome: dep.nome, valor: arredDinheiro_(valor), skus: skus };
  });

  var tecnicos = pos.locais.filter(function (l) { return l.tipo === 'TECNICO'; }).map(function (t) {
    var valor = 0;
    var qtd = 0;
    var skus = 0;
    ativos.forEach(function (item) {
      item.locais.forEach(function (loc) {
        if (loc.id === t.id && loc.qtd > 0) {
          valor += loc.qtd * item.custo;
          qtd += loc.qtd;
          skus++;
        }
      });
    });
    return {
      id: t.id,
      nome: t.nome,
      ativo: t.ativo,
      valor: arredDinheiro_(valor),
      qtd: arredQtd_(qtd),
      skus: skus
    };
  }).filter(function (t) { return t.ativo === '1' || t.qtd > 0; }).sort(function (a, b) {
    return b.valor - a.valor;
  });

  var limite = (agoraMs || Date.now()) - (30 * 24 * 60 * 60 * 1000);
  var mov30 = 0;
  (movimentos || []).forEach(function (m) {
    if (m.tipo === 'SALDO_INICIAL') return;
    if (parseQuando_(m.quando) >= limite) mov30++;
  });

  var recentesFonte = (movimentos || []).filter(function (m) { return m.tipo !== 'SALDO_INICIAL'; });
  var recentes = recentesFonte.slice(-8).reverse().map(function (m) {
    return enriquecerMov_(m, base);
  });

  return {
    kpis: {
      valorDeposito: arredDinheiro_(valorDeposito),
      valorTecnicos: arredDinheiro_(valorTecnicos),
      valorTotal: arredDinheiro_(valorDeposito + valorTecnicos),
      abaixo: alertas.length,
      semPonto: ativos.filter(function (l) { return l.status === 'sem_ponto'; }).length,
      movimentos30d: mov30,
      skus: ativos.length
    },
    alertas: alertas,
    abc: pos.abc,
    depositos: depositos,
    tecnicos: tecnicos,
    recentes: recentes
  };
}

function salvarItemNaBase_(base, bruto) {
  var itens = (base.itens || []).map(copiarItem_);
  var novo = copiarItem_(bruto);
  if (!novo.sku) throw new Error('Informe o SKU.');
  if (!/^[A-Za-z0-9._-]{1,40}$/.test(novo.sku)) throw new Error('SKU: use letras, números, ponto ou hífen (até 40).');
  if (!novo.produto) throw new Error('Informe o produto.');
  if (novo.custo < 0) throw new Error('Custo não pode ser negativo.');
  if (novo.minimo < 0) throw new Error('Ponto de pedido não pode ser negativo.');
  var achou = false;
  for (var i = 0; i < itens.length; i++) {
    if (itens[i].sku.toUpperCase() === novo.sku.toUpperCase()) {
      novo.sku = itens[i].sku;
      itens[i] = novo;
      achou = true;
      break;
    }
  }
  if (!achou) {
    novo.sku = novo.sku.toUpperCase();
    itens.push(novo);
  }
  return {
    base: { itens: itens, locais: base.locais, saldos: base.saldos, seq: base.seq, movimentos: base.movimentos },
    criado: !achou,
    item: novo
  };
}

function salvarLocalNaBase_(base, bruto) {
  var locais = (base.locais || []).map(copiarLocal_);
  var nome = String(bruto.nome || '').trim().slice(0, 80);
  if (nome.length < 2) throw new Error('Informe o nome.');
  var tipo = String(bruto.tipo || 'TECNICO').toUpperCase() === 'DEPOSITO' ? 'DEPOSITO' : 'TECNICO';
  var id = String(bruto.id || '').trim();
  if (!id) {
    var baseId = (tipo === 'TECNICO' ? 'tec-' : 'dep-') + slug_(nome);
    id = baseId;
    var n = 2;
    while (localPorId_(locais, id)) {
      id = baseId + '-' + n;
      n++;
    }
  }
  var existente = localPorId_(locais, id);
  if (existente && existente.tipo !== tipo && saldoDoLocal_(base.saldos, id) > 0) {
    throw new Error('Este local ainda tem saldo. Esvazie antes de mudar o tipo.');
  }
  if (existente) {
    existente.nome = nome;
    existente.tipo = tipo;
    if (bruto.ativo !== undefined) existente.ativo = flagAtivo_(bruto.ativo);
  } else {
    locais.push({ id: id, nome: nome, tipo: tipo, ativo: '1' });
  }
  return {
    base: { itens: base.itens, locais: locais, saldos: base.saldos, seq: base.seq, movimentos: base.movimentos },
    local: localPorId_(locais, id)
  };
}

function saldoDoLocal_(saldos, localId) {
  var t = 0;
  (saldos || []).forEach(function (s) {
    if (s.localId === localId) t += Number(s.qtd) || 0;
  });
  return arredQtd_(t);
}

function inativarLocal_(base, id) {
  if (saldoDoLocal_(base.saldos, id) > 0) {
    throw new Error('Ainda há saldo neste local. Devolva, transfira ou baixe antes de inativar.');
  }
  var locais = (base.locais || []).map(copiarLocal_);
  var achou = false;
  locais.forEach(function (l) {
    if (l.id === id) { l.ativo = '0'; achou = true; }
  });
  if (!achou) throw new Error('Local não encontrado.');
  return { itens: base.itens, locais: locais, saldos: base.saldos, seq: base.seq, movimentos: base.movimentos };
}

function sugerirMinimos_(base) {
  var pos = montarPosicao_(base);
  var porSku = {};
  pos.linhas.forEach(function (l) { porSku[l.sku] = l; });
  var n = 0;
  var itens = (base.itens || []).map(function (item) {
    var copia = copiarItem_(item);
    var linha = porSku[copia.sku];
    if (copia.ativo === '1' && copia.minimo <= 0 && linha && linha.qtdDeposito > 0) {
      var sug = sugerirMinimo_(linha.qtdDeposito);
      if (sug > 0) {
        copia.minimo = sug;
        n++;
      }
    }
    return copia;
  });
  return {
    base: { itens: itens, locais: base.locais, saldos: base.saldos, seq: base.seq, movimentos: base.movimentos },
    atualizados: n
  };
}

function garantirLocal_(base, deposito) {
  if (localPorId_(base.locais || [], deposito.id)) return base;
  var salvo = salvarLocalNaBase_(base, deposito);
  return salvo.base;
}

function parseCsv_(texto) {
  var s = String(texto || '').replace(/^\uFEFF/, '');
  var linhas = [];
  var row = [];
  var campo = '';
  var aspas = false;
  for (var i = 0; i < s.length; i++) {
    var c = s.charAt(i);
    if (aspas) {
      if (c === '"') {
        if (s.charAt(i + 1) === '"') { campo += '"'; i++; }
        else aspas = false;
      } else campo += c;
    } else if (c === '"') {
      aspas = true;
    } else if (c === ';') {
      row.push(campo);
      campo = '';
    } else if (c === '\n') {
      row.push(campo);
      linhas.push(row);
      row = [];
      campo = '';
    } else if (c !== '\r') {
      campo += c;
    }
  }
  if (campo.length || row.length) {
    row.push(campo);
    linhas.push(row);
  }
  return linhas.filter(function (l) { return l.some(function (c) { return String(c || '').trim() !== ''; }); });
}

function mapearCabecalho_(cab) {
  var mapa = {};
  for (var i = 0; i < cab.length; i++) {
    var s = semAcento_(cab[i]).trim();
    var chave = '';
    if (s.indexOf('interno') >= 0) chave = 'sku';
    else if (s.indexOf('externo') >= 0) chave = 'skuExterno';
    else if (s.indexOf('produto') >= 0 || s.indexOf('descri') >= 0) chave = 'produto';
    else if (s.indexOf('categoria') >= 0) chave = 'categoria';
    else if (s.indexOf('minimo') >= 0 || s.indexOf('ponto') >= 0) chave = 'minimo';
    else if (s.indexOf('ncm') >= 0) chave = 'ncm';
    else if (s.indexOf('atual') >= 0 || s.indexOf('quantidade') >= 0 || s === 'qtd') chave = 'qtd';
    else if (s.indexOf('custo') >= 0) chave = 'custo';
    else if (s.indexOf('dep') >= 0) chave = 'deposito';
    else if (s.indexOf('unidade') >= 0 || s === 'un' || s === 'um') chave = 'unidade';
    if (chave && mapa[chave] === undefined) mapa[chave] = i;
  }
  return mapa;
}

function cel_(row, idx) {
  if (idx === undefined || idx === null || idx < 0) return '';
  return row[idx] === undefined || row[idx] === null ? '' : String(row[idx]).trim();
}

function importarLinhas_(base, texto, opcoes, usuario, quando) {
  opcoes = opcoes || {};
  var tabela = parseCsv_(texto);
  if (!tabela.length) throw new Error('CSV vazio.');
  var mapa = mapearCabecalho_(tabela[0]);
  if (mapa.sku === undefined || mapa.produto === undefined) {
    throw new Error('O CSV precisa das colunas de SKU interno e produto.');
  }
  var criados = 0;
  var atualizados = 0;
  var ajustes = 0;
  var ignorados = 0;
  var erros = [];
  var movimentos = [];
  var atual = base;

  for (var i = 1; i < tabela.length; i++) {
    var row = tabela[i];
    var sku = cel_(row, mapa.sku);
    var produto = cel_(row, mapa.produto);
    if (!sku && !produto) { ignorados++; continue; }
    if (!sku) {
      erros.push('Linha ' + (i + 1) + ': sem SKU.');
      ignorados++;
      continue;
    }
    try {
      var existente = acharItem_(atual.itens || [], sku);
      var item = {
        sku: sku,
        produto: produto || (existente ? existente.produto : ''),
        categoria: (mapa.categoria !== undefined && celulaInformada_(cel_(row, mapa.categoria)))
          ? cel_(row, mapa.categoria)
          : (existente ? existente.categoria : 'Durável'),
        unidade: (mapa.unidade !== undefined && celulaInformada_(cel_(row, mapa.unidade)))
          ? cel_(row, mapa.unidade)
          : (existente ? existente.unidade : 'Un'),
        ncm: mapa.ncm !== undefined ? cel_(row, mapa.ncm) : (existente ? existente.ncm : ''),
        custo: (mapa.custo !== undefined && celulaInformada_(cel_(row, mapa.custo)))
          ? parseNumeroBr_(cel_(row, mapa.custo))
          : (existente ? existente.custo : 0),
        minimo: (mapa.minimo !== undefined && celulaInformada_(cel_(row, mapa.minimo)))
          ? parseNumeroBr_(cel_(row, mapa.minimo))
          : (existente ? existente.minimo : 0),
        ativo: existente ? existente.ativo : '1'
      };
      var salvo = salvarItemNaBase_(atual, item);
      atual = salvo.base;
      if (salvo.criado) criados++;
      else atualizados++;

      if (opcoes.atualizarSaldos && mapa.qtd !== undefined && celulaInformada_(cel_(row, mapa.qtd))) {
        var deposito = mapa.deposito !== undefined ? normalizarDeposito_(cel_(row, mapa.deposito)) : null;
        if (!deposito) throw new Error('depósito não reconhecido para lançar saldo.');
        atual = garantirLocal_(atual, deposito);
        var skuReal = acharItem_(atual.itens, sku).sku;
        var livro = saldoDe_(atual.saldos || [], skuReal, deposito.id);
        var fisica = arredQtd_(parseNumeroBr_(cel_(row, mapa.qtd)));
        if (Math.abs(livro - fisica) > 0.0001) {
          var r = aplicarMovimento_(atual, {
            tipo: 'AJUSTE',
            sku: skuReal,
            localId: deposito.id,
            fisica: fisica,
            documento: 'CSV',
            motivo: 'Importação de saldo'
          }, usuario, quando);
          atual = r.base;
          if (r.movimento) {
            movimentos.push(r.movimento);
            ajustes++;
          }
        }
      }
    } catch (e) {
      erros.push('Linha ' + (i + 1) + ' (' + sku + '): ' + (e.message || e));
    }
  }

  return {
    base: atual,
    movimentos: movimentos,
    resumo: { criados: criados, atualizados: atualizados, ajustes: ajustes, ignorados: ignorados, erros: erros }
  };
}

function aplicarContagem_(base, pedido, usuario, quando) {
  if (!pedido || !pedido.localId) throw new Error('Escolha o local da contagem.');
  var atual = base;
  var movimentos = [];
  (pedido.linhas || []).forEach(function (linha) {
    if (!linha || linha.fisica === '' || linha.fisica === null || linha.fisica === undefined) return;
    var r = aplicarMovimento_(atual, {
      tipo: 'AJUSTE',
      sku: linha.sku,
      localId: pedido.localId,
      fisica: linha.fisica,
      documento: pedido.documento || 'CONTAGEM',
      motivo: 'Contagem de inventário'
    }, usuario, quando);
    atual = r.base;
    if (r.movimento) movimentos.push(r.movimento);
  });
  return { base: atual, movimentos: movimentos };
}

function baseInicial_() {
  var base = {
    itens: SEMENTE_ITENS.map(function (item) {
      return {
        sku: item.sku,
        produto: item.produto,
        categoria: item.categoria,
        unidade: item.unidade,
        ncm: item.ncm,
        custo: item.custo,
        minimo: 0,
        ativo: '1'
      };
    }),
    locais: SEMENTE_LOCAIS.map(function (l) {
      return { id: l.id, nome: l.nome, tipo: l.tipo, ativo: '1' };
    }),
    saldos: [],
    seq: 0,
    movimentos: []
  };
  var movimentos = [];
  SEMENTE_ITENS.forEach(function (item) {
    if (!(item.qtd > 0)) return;
    var r = aplicarMovimento_(base, {
      tipo: 'SALDO_INICIAL',
      sku: item.sku,
      qtd: item.qtd,
      destinoId: item.depositoId,
      documento: 'ABERTURA',
      motivo: 'Carga inicial do estoque'
    }, 'sistema', '2026-09-01 08:00:00');
    base = r.base;
    if (r.movimento) movimentos.push(r.movimento);
  });
  base.movimentos = movimentos;
  return base;
}


/* ===================================================================== serviço */

function criarServico_(io) {
  function ler() {
    var base = io.ler();
    base.itens = base.itens || [];
    base.locais = base.locais || [];
    base.saldos = base.saldos || [];
    base.movimentos = base.movimentos || [];
    base.seq = Number(base.seq) || 0;
    return base;
  }

  function gravar(base, novos) {
    io.gravar(base, novos || []);
  }

  return {
    apiContexto: function () {
      ler();
      var usuario = io.contextoUsuario();
      return {
        app: { nome: APP.nome, versao: APP.versao },
        usuario: usuario,
        planilhaUrl: io.url() || '',
        abaixo: montarPainel_(ler(), ler().movimentos, io.agoraMs()).kpis.abaixo
      };
    },
    apiPainel: function () {
      var base = ler();
      return montarPainel_(base, base.movimentos, io.agoraMs());
    },
    apiEstoque: function () {
      return montarPosicao_(ler());
    },
    apiHistorico: function () {
      var base = ler();
      var lista = base.movimentos.slice(-400).reverse().map(function (m) {
        return enriquecerMov_(m, base);
      });
      return { movimentos: lista, recorte: base.movimentos.length > 400 };
    },
    apiMovimentar: function (pedido) {
      var base = ler();
      var r = aplicarMovimento_(base, pedido || {}, io.usuario(), io.agora());
      if (!r.movimento) return { mensagem: 'Nada a lançar.', movimento: null };
      gravar(r.base, [r.movimento]);
      return {
        mensagem: MENSAGEM_TIPO[r.movimento.tipo] || 'Movimentação lançada.',
        movimento: enriquecerMov_(r.movimento, r.base)
      };
    },
    apiSalvarItem: function (item) {
      var base = ler();
      var salvo = salvarItemNaBase_(base, item || {});
      gravar(salvo.base, []);
      return { item: salvo.item, criado: salvo.criado };
    },
    apiSalvarLocal: function (local) {
      var base = ler();
      var salvo = salvarLocalNaBase_(base, local || {});
      gravar(salvo.base, []);
      return { local: salvo.local };
    },
    apiInativarLocal: function (id) {
      var base = ler();
      gravar(inativarLocal_(base, id), []);
      return { ok: true };
    },
    apiReativarLocal: function (id) {
      var base = ler();
      var locais = (base.locais || []).map(copiarLocal_);
      var achou = false;
      locais.forEach(function (l) {
        if (l.id === id) { l.ativo = '1'; achou = true; }
      });
      if (!achou) throw new Error('Local não encontrado.');
      gravar({ itens: base.itens, locais: locais, saldos: base.saldos, seq: base.seq, movimentos: base.movimentos }, []);
      return { ok: true };
    },
    apiContagem: function (pedido) {
      var base = ler();
      var r = aplicarContagem_(base, pedido || {}, io.usuario(), io.agora());
      if (!r.movimentos.length) return { ajustes: 0, mensagem: 'Nenhuma diferença para lançar.' };
      gravar(r.base, r.movimentos);
      return { ajustes: r.movimentos.length, mensagem: r.movimentos.length + ' ajuste(s) de contagem lançado(s).' };
    },
    apiImportarCsv: function (payload) {
      var base = ler();
      var texto = payload && payload.texto ? payload.texto : payload;
      var atualizar = !!(payload && payload.atualizarSaldos);
      var r = importarLinhas_(base, texto, { atualizarSaldos: atualizar }, io.usuario(), io.agora());
      gravar(r.base, r.movimentos);
      return r.resumo;
    },
    apiSugerirMinimos: function () {
      var base = ler();
      var r = sugerirMinimos_(base);
      gravar(r.base, []);
      return { atualizados: r.atualizados, mensagem: r.atualizados + ' ponto(s) de pedido sugerido(s).' };
    }
  };
}


/* ===================================================================== planilha */

function doGet(e) {
  var params = (e && e.parameter) || {};
  return HtmlService.createHtmlOutput(paginaHtml_(params))
    .setTitle(APP.nome)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, viewport-fit=cover')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function comLock_(fn) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    return fn();
  } finally {
    lock.releaseLock();
  }
}

function propriedades_() {
  return PropertiesService.getScriptProperties();
}

function obterPlanilha_() {
  var props = propriedades_();
  var id = props.getProperty('PLANILHA_ID');
  if (id) {
    try {
      return SpreadsheetApp.openById(id);
    } catch (e) {
      id = '';
    }
  }
  var ss = SpreadsheetApp.create('Estoque de Campo');
  try { ss.setSpreadsheetTimeZone('America/Sao_Paulo'); } catch (e2) {}
  var folhas = ss.getSheets();
  folhas[0].setName('Itens');
  ['Locais', 'Saldos', 'Movimentos', 'Controle'].forEach(function (nome) {
    ss.insertSheet(nome);
  });
  props.setProperty('PLANILHA_ID', ss.getId());
  gravarBaseCompleta_(ss, baseInicial_());
  return ss;
}

function aba_(ss, nome) {
  var sheet = ss.getSheetByName(nome);
  if (!sheet) sheet = ss.insertSheet(nome);
  return sheet;
}

function escreverRegistros_(sheet, campos, registros) {
  var cab = campos.map(function (c) { return c[1]; });
  var linhas = (registros || []).map(function (r) {
    return campos.map(function (c) {
      var v = r[c[0]];
      return v === undefined || v === null ? '' : v;
    });
  });
  var dados = [cab].concat(linhas);
  sheet.clear();
  sheet.getRange(1, 1, dados.length, cab.length).setValues(dados);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, cab.length).setFontWeight('bold');
}

function lerRegistros_(sheet, campos) {
  var faixa = sheet.getDataRange();
  if (!faixa) return [];
  var valores = faixa.getValues();
  if (!valores || !valores.length) return [];
  var cab = valores[0].map(function (h) { return String(h || '').trim(); });
  if (!cab.join('')) return [];
  var idx = {};
  campos.forEach(function (c) {
    var i = cab.indexOf(c[1]);
    if (i < 0) i = cab.indexOf(c[0]);
    idx[c[0]] = i;
  });
  var saida = [];
  for (var r = 1; r < valores.length; r++) {
    var obj = {};
    var vazio = true;
    campos.forEach(function (c) {
      var i = idx[c[0]];
      var v = i >= 0 ? valores[r][i] : '';
      if (v !== '' && v !== null && v !== undefined) vazio = false;
      obj[c[0]] = v;
    });
    if (!vazio) saida.push(obj);
  }
  return saida;
}

function comoTexto_(valor) {
  if (Object.prototype.toString.call(valor) === '[object Date]' && !isNaN(valor.getTime())) {
    return Utilities.formatDate(valor, 'America/Sao_Paulo', 'yyyy-MM-dd HH:mm:ss');
  }
  return valor === undefined || valor === null ? '' : String(valor);
}

function lerBase_(ss) {
  var itens = lerRegistros_(aba_(ss, 'Itens'), CAMPOS_ITENS).map(copiarItem_);
  var locais = lerRegistros_(aba_(ss, 'Locais'), CAMPOS_LOCAIS).map(copiarLocal_);
  var saldos = lerRegistros_(aba_(ss, 'Saldos'), CAMPOS_SALDOS).map(function (s) {
    return { sku: String(s.sku || '').trim(), localId: String(s.localId || '').trim(), qtd: arredQtd_(s.qtd) };
  }).filter(function (s) { return s.sku && s.localId && s.qtd > 0; });
  var movimentos = lerRegistros_(aba_(ss, 'Movimentos'), CAMPOS_MOV).map(function (m) {
    m.quando = comoTexto_(m.quando);
    m.qtd = arredQtd_(m.qtd);
    m.custo = arredDinheiro_(m.custo);
    m.valor = arredDinheiro_(m.valor);
    m.sku = String(m.sku || '');
    return m;
  });
  var seq = 0;
  lerRegistros_(aba_(ss, 'Controle'), [['chave', 'Chave'], ['valor', 'Valor']]).forEach(function (r) {
    if (String(r.chave) === 'seq') seq = Number(r.valor) || 0;
  });
  if (!seq && movimentos.length) {
    movimentos.forEach(function (m) {
      var n = Number(String(m.id || '').replace(/\D/g, '')) || 0;
      if (n > seq) seq = n;
    });
  }
  return { itens: itens, locais: locais, saldos: saldos, movimentos: movimentos, seq: seq };
}

function gravarMestre_(ss, base) {
  escreverRegistros_(aba_(ss, 'Itens'), CAMPOS_ITENS, (base.itens || []).map(copiarItem_));
  escreverRegistros_(aba_(ss, 'Locais'), CAMPOS_LOCAIS, (base.locais || []).map(copiarLocal_));
  escreverRegistros_(aba_(ss, 'Saldos'), CAMPOS_SALDOS, base.saldos || []);
  escreverRegistros_(aba_(ss, 'Controle'), [['chave', 'Chave'], ['valor', 'Valor']], [
    { chave: 'seq', valor: Number(base.seq) || 0 },
    { chave: 'app', valor: APP.nome + ' ' + APP.versao }
  ]);
}

function anexarMovimentos_(ss, movimentos) {
  if (!movimentos || !movimentos.length) return;
  var sheet = aba_(ss, 'Movimentos');
  if (sheet.getLastRow() < 1) {
    escreverRegistros_(sheet, CAMPOS_MOV, []);
  }
  var dados = movimentos.map(function (r) {
    return CAMPOS_MOV.map(function (c) {
      var v = r[c[0]];
      return v === undefined || v === null ? '' : v;
    });
  });
  var linha = Math.max(sheet.getLastRow(), 1);
  sheet.getRange(linha + 1, 1, dados.length, CAMPOS_MOV.length).setValues(dados);
}

function gravarBaseCompleta_(ss, base) {
  gravarMestre_(ss, base);
  escreverRegistros_(aba_(ss, 'Movimentos'), CAMPOS_MOV, base.movimentos || []);
}

function gravarDepois_(ss, base, novos) {
  gravarMestre_(ss, base);
  anexarMovimentos_(ss, novos || []);
}

function identificarUsuario_() {
  var email = '';
  try { email = Session.getActiveUser().getEmail() || ''; } catch (e) {}
  if (!email) {
    try { email = Session.getEffectiveUser().getEmail() || ''; } catch (e2) {}
  }
  var nome = email
    ? email.split('@')[0].split(/[._-]/).map(function (parte) {
        if (!parte) return '';
        return parte.charAt(0).toUpperCase() + parte.slice(1);
      }).filter(Boolean).join(' ')
    : 'Operador';
  return { email: email, nome: nome || 'Operador', iniciais: iniciais_(nome || 'Operador') };
}

function iniciais_(nome) {
  var partes = String(nome || '').trim().split(/\s+/);
  if (!partes[0]) return '?';
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
  return (partes[0].charAt(0) + partes[partes.length - 1].charAt(0)).toUpperCase();
}

function agoraIso_() {
  try {
    return Utilities.formatDate(new Date(), 'America/Sao_Paulo', 'yyyy-MM-dd HH:mm:ss');
  } catch (e) {
    return new Date().toISOString();
  }
}

function urlPlanilha_() {
  var id = propriedades_().getProperty('PLANILHA_ID') || '';
  return id ? 'https://docs.google.com/spreadsheets/d/' + id + '/edit' : '';
}

function googleServico_() {
  return criarServico_({
    ler: function () { return lerBase_(obterPlanilha_()); },
    gravar: function (base, novos) { gravarDepois_(obterPlanilha_(), base, novos); },
    usuario: function () {
      var u = identificarUsuario_();
      return u.email || u.nome;
    },
    agora: function () { return agoraIso_(); },
    agoraMs: function () { return Date.now(); },
    url: function () { return urlPlanilha_(); },
    contextoUsuario: function () { return identificarUsuario_(); }
  });
}

function apiContexto() { return comLock_(function () { return googleServico_().apiContexto(); }); }
function apiPainel() { return comLock_(function () { return googleServico_().apiPainel(); }); }
function apiEstoque() { return comLock_(function () { return googleServico_().apiEstoque(); }); }
function apiHistorico() { return comLock_(function () { return googleServico_().apiHistorico(); }); }
function apiMovimentar(pedido) { return comLock_(function () { return googleServico_().apiMovimentar(pedido); }); }
function apiSalvarItem(item) { return comLock_(function () { return googleServico_().apiSalvarItem(item); }); }
function apiSalvarLocal(local) { return comLock_(function () { return googleServico_().apiSalvarLocal(local); }); }
function apiInativarLocal(id) { return comLock_(function () { return googleServico_().apiInativarLocal(id); }); }
function apiReativarLocal(id) { return comLock_(function () { return googleServico_().apiReativarLocal(id); }); }
function apiContagem(pedido) { return comLock_(function () { return googleServico_().apiContagem(pedido); }); }
function apiImportarCsv(payload) { return comLock_(function () { return googleServico_().apiImportarCsv(payload); }); }
function apiSugerirMinimos() { return comLock_(function () { return googleServico_().apiSugerirMinimos(); }); }


/* ===================================================================== tela */

function paginaHtml_(params) {
  var view = params && params.view ? String(params.view) : '';
  view = view.replace(/[^a-z]/gi, '').slice(0, 20).toLowerCase();
  return htmlApp_().replace('__PARAMETROS__', JSON.stringify({ view: view }));
}

function htmlApp_() {
  return '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n<meta charset="utf-8">\n<base target="_top">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<title>Estoque de Campo</title>\n<style>\n' +
    cssApp_() +
    '\n</style>\n</head>\n<body>\n' +
    cascaHtml_() +
    '\n<script>\nvar PARAMETROS = __PARAMETROS__;\n' +
    clienteJs_() +
    '\n</script>\n</body>\n</html>';
}

function cssApp_() {
  return [
    ':root {',
    '--bg:#F3F4F7; --superficie:#FFFFFF; --superficie-2:#FAFAFB; --superficie-3:#F1F2F6;',
    '--linha:#E6E8EE; --linha-forte:#D6DAE3;',
    '--tinta:#0D1220; --tinta-2:#59627A; --tinta-3:#949CB0;',
    '--marca:#E4002B; --marca-escura:#B80023; --marca-suave:#FDEBEF;',
    '--verde:#109E5C; --verde-suave:#E6F6EE; --ambar:#DC9A06; --ambar-suave:#FEF4E0;',
    '--vermelho:#DC2B45; --vermelho-suave:#FDECEF; --azul:#2563EB; --azul-suave:#E8F0FE;',
    '--cinza:#9AA3B5; --cinza-suave:#F0F1F5;',
    '--raio-g:20px; --raio:14px; --raio-p:9px;',
    '--sombra-1:0 1px 2px rgba(13,18,32,.05);',
    '--sombra-2:0 1px 2px rgba(13,18,32,.04), 0 10px 28px -14px rgba(13,18,32,.22);',
    '--sombra-3:0 2px 4px rgba(13,18,32,.05), 0 24px 48px -20px rgba(13,18,32,.28);',
    "--fonte:-apple-system,BlinkMacSystemFont,'Segoe UI Variable Text','Segoe UI',Inter,Roboto,'Helvetica Neue',Arial,sans-serif;",
    '--lateral:248px; --transicao:180ms cubic-bezier(.4,0,.2,1);',
    '}',
    '* { box-sizing:border-box; }',
    'html,body { margin:0; padding:0; height:100%; background:var(--bg); color:var(--tinta); font-family:var(--fonte); font-size:14px; line-height:1.45; -webkit-font-smoothing:antialiased; }',
    'body { overflow:hidden; }',
    '.num { font-variant-numeric:tabular-nums; font-feature-settings:"tnum" 1; }',
    '::-webkit-scrollbar { width:10px; height:10px; }',
    '::-webkit-scrollbar-thumb { background:var(--linha-forte); border-radius:99px; border:3px solid var(--bg); }',
    '.casca { display:grid; grid-template-columns:var(--lateral) 1fr; height:100vh; overflow:hidden; transition:grid-template-columns 180ms ease; }',
    '.casca.sidebar-recolhida { --lateral:72px; }',
    '.lateral { background:var(--superficie); border-right:1px solid var(--linha); display:flex; flex-direction:column; gap:6px; padding:18px 14px; overflow-y:auto; }',
    '.casca.sidebar-recolhida .lateral { padding:14px 8px; overflow-x:hidden; }',
    '.marca { display:flex; flex-direction:column; align-items:flex-start; gap:10px; padding:2px 8px 16px; }',
    '.casca.sidebar-recolhida .marca { align-items:center; padding:2px 0 10px; }',
    '.marca-linha { display:flex; align-items:center; justify-content:space-between; gap:8px; width:100%; }',
    '.casca.sidebar-recolhida .marca-linha { justify-content:center; }',
    '.marca-sigla { width:42px; height:42px; border-radius:12px; background:var(--marca); color:#fff; display:grid; place-items:center; font-weight:800; letter-spacing:-.4px; flex-shrink:0; }',
    '.marca-nome { font-weight:700; font-size:14.5px; letter-spacing:-.25px; }',
    '.marca-sub { font-size:11px; color:var(--tinta-3); letter-spacing:.2px; }',
    '.casca.sidebar-recolhida .marca-textos, .casca.sidebar-recolhida .usuario-dados, .casca.sidebar-recolhida .nav-titulo, .casca.sidebar-recolhida .nav-item > span:not(.sino-badge), .casca.sidebar-recolhida .lateral-rodape { display:none; }',
    '.cartao-usuario { background:var(--superficie-2); border:1px solid var(--linha); border-radius:var(--raio); padding:12px; display:flex; align-items:center; gap:10px; margin-bottom:14px; }',
    '.casca.sidebar-recolhida .cartao-usuario { justify-content:center; padding:8px; margin-bottom:8px; }',
    '.avatar { width:36px; height:36px; border-radius:10px; background:var(--tinta); color:var(--superficie); display:grid; place-items:center; font-weight:700; font-size:12.5px; flex-shrink:0; }',
    '.usuario-dados { min-width:0; }',
    '.usuario-nome { font-weight:650; font-size:13px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }',
    '.usuario-papel { font-size:11px; color:var(--tinta-3); }',
    '.nav-titulo { font-size:10.5px; font-weight:700; letter-spacing:.9px; text-transform:uppercase; color:var(--tinta-3); padding:12px 10px 6px; }',
    '.nav-item { display:flex; align-items:center; gap:11px; padding:9px 11px; border-radius:var(--raio-p); color:var(--tinta-2); font-weight:550; font-size:13.5px; cursor:pointer; border:1px solid transparent; transition:background var(--transicao), color var(--transicao); user-select:none; width:100%; background:transparent; font-family:var(--fonte); text-align:left; }',
    '.nav-item:hover { background:var(--superficie-3); color:var(--tinta); }',
    '.nav-item.ativo { background:var(--marca-suave); color:var(--marca); border-color:rgba(228,0,43,.16); font-weight:650; }',
    '.nav-item svg { width:17px; height:17px; flex-shrink:0; }',
    '.casca.sidebar-recolhida .nav-item { justify-content:center; padding:10px 0; }',
    '.lateral-rodape { padding:12px 10px 2px; font-size:10.5px; color:var(--tinta-3); border-top:1px solid var(--linha); }',
    '.lateral-rodape a { color:var(--tinta-2); text-decoration:none; }',
    '.lateral-rodape a:hover { color:var(--marca); }',
    '.caixa-pendencias { margin-top:auto; flex-shrink:0; padding-top:8px; }',
    '.sino-badge { margin-left:auto; min-width:20px; height:20px; padding:0 6px; border-radius:99px; background:var(--vermelho); color:#fff; font-size:11px; font-weight:800; display:inline-flex; align-items:center; justify-content:center; }',
    '.principal { display:flex; flex-direction:column; overflow:hidden; min-width:0; }',
    '.topo { height:62px; flex-shrink:0; background:var(--superficie); border-bottom:1px solid var(--linha); display:flex; align-items:center; gap:14px; padding:0 22px; }',
    '.topo-titulo { font-size:16px; font-weight:700; letter-spacing:-.35px; }',
    '.topo-sub { font-size:11.5px; color:var(--tinta-3); }',
    '.topo-direita { margin-left:auto; display:flex; align-items:center; gap:9px; }',
    '.pilula { display:inline-flex; align-items:center; gap:6px; height:30px; padding:0 11px; border-radius:99px; font-size:12px; font-weight:600; border:1px solid var(--linha); background:var(--superficie-2); color:var(--tinta-2); white-space:nowrap; }',
    '.pilula.ok { background:var(--verde-suave); color:var(--verde); border-color:transparent; }',
    '.pilula.erro { background:var(--vermelho-suave); color:var(--vermelho); border-color:transparent; }',
    '.ponto { width:7px; height:7px; border-radius:99px; background:currentColor; }',
    '.botao { display:inline-flex; align-items:center; gap:7px; height:34px; padding:0 13px; border-radius:var(--raio-p); border:1px solid var(--linha); background:var(--superficie); color:var(--tinta-2); font-family:var(--fonte); font-size:12.5px; font-weight:600; cursor:pointer; transition:all var(--transicao); white-space:nowrap; }',
    '.botao:hover { background:var(--superficie-3); color:var(--tinta); border-color:var(--linha-forte); }',
    '.botao:disabled { opacity:.55; cursor:wait; }',
    '.botao svg { width:15px; height:15px; }',
    '.botao.primario { background:var(--marca); border-color:var(--marca); color:#fff; box-shadow:0 4px 12px -5px rgba(228,0,43,.6); }',
    '.botao.primario:hover { background:var(--marca-escura); border-color:var(--marca-escura); color:#fff; }',
    '.botao.perigo { color:var(--vermelho); }',
    '.botao.perigo:hover { background:var(--vermelho-suave); color:var(--vermelho); }',
    '.botao-sidebar { width:34px; padding:0; justify-content:center; flex-shrink:0; }',
    '.botao.girando svg { animation:girar 900ms linear infinite; }',
    '@keyframes girar { to { transform:rotate(360deg); } }',
    '.area-conteudo { position:relative; flex:1; min-height:0; display:flex; flex-direction:column; }',
    '.conteudo { flex:1; overflow-y:auto; padding:22px; }',
    '.nav-topo { display:none; gap:6px; padding:8px 16px; overflow-x:auto; background:var(--superficie); border-bottom:1px solid var(--linha); flex-shrink:0; }',
    '.nav-topo .nav-item { width:auto; flex-shrink:0; padding:7px 10px; font-size:12.5px; }',
    '.cartao { background:var(--superficie); border:1px solid var(--linha); border-radius:var(--raio-g); box-shadow:var(--sombra-2); }',
    '.grade-kpi { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:14px; margin-bottom:16px; }',
    '.kpi { padding:16px 18px; position:relative; overflow:hidden; }',
    '.kpi::after { content:""; position:absolute; inset:0 auto 0 0; width:3px; background:var(--cinza); }',
    '.kpi.destaque::after { background:var(--marca); }',
    '.kpi.verde::after { background:var(--verde); }',
    '.kpi.ambar::after { background:var(--ambar); }',
    '.kpi.vermelho::after { background:var(--vermelho); }',
    '.kpi-rotulo { font-size:11px; font-weight:700; letter-spacing:.75px; text-transform:uppercase; color:var(--tinta-3); margin-bottom:7px; }',
    '.kpi-valor { font-size:28px; font-weight:750; letter-spacing:-1.1px; line-height:1.05; }',
    '.kpi-unidade { font-size:13px; font-weight:600; color:var(--tinta-3); margin-left:4px; letter-spacing:0; }',
    '.kpi-apoio { font-size:12px; color:var(--tinta-2); margin-top:6px; }',
    '.aviso { display:flex; align-items:flex-start; gap:10px; padding:11px 14px; border-radius:var(--raio); font-size:13px; font-weight:550; border:1px solid transparent; margin-bottom:12px; }',
    '.aviso.atencao { background:var(--ambar-suave); color:#8A6204; }',
    '.aviso.critico { background:var(--vermelho-suave); color:var(--vermelho); }',
    '.aviso.ok { background:var(--verde-suave); color:var(--verde); }',
    '.aviso.info { background:var(--superficie-2); color:var(--tinta-2); border:1px solid var(--linha); }',
    '.secao-titulo { display:flex; align-items:center; gap:9px; font-size:12px; font-weight:700; letter-spacing:.7px; text-transform:uppercase; color:var(--tinta-3); margin:6px 2px 11px; }',
    '.secao-titulo::after { content:""; flex:1; height:1px; background:var(--linha); }',
    '.grade-2 { display:grid; grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr); gap:14px; margin-bottom:14px; }',
    '@media (max-width:980px) { .grade-2 { grid-template-columns:1fr; } }',
    '.bloco { padding:16px 18px 14px; }',
    '.bloco h3 { margin:0 0 4px; font-size:15px; letter-spacing:-.2px; }',
    '.bloco .sub { color:var(--tinta-2); font-size:12.5px; margin-bottom:12px; }',
    '.tabela-wrap { overflow-x:auto; }',
    'table.cadastro { width:100%; border-collapse:collapse; font-size:13px; }',
    'table.cadastro th { text-align:left; font-size:10.5px; font-weight:700; letter-spacing:.7px; text-transform:uppercase; color:var(--tinta-3); padding:10px 12px; border-bottom:1px solid var(--linha); white-space:nowrap; }',
    'table.cadastro td { padding:10px 12px; border-bottom:1px solid var(--linha); vertical-align:middle; }',
    'table.cadastro tr:hover td { background:var(--superficie-2); }',
    'table.cadastro th.num, table.cadastro td.num { text-align:right; }',
    'table.cadastro tr.inativa td { opacity:.55; }',
    '.sku { font-weight:750; letter-spacing:-.2px; }',
    '.selo { display:inline-flex; align-items:center; height:22px; padding:0 8px; border-radius:99px; font-size:11px; font-weight:750; letter-spacing:.2px; }',
    '.st-ok { background:var(--verde-suave); color:var(--verde); }',
    '.st-abaixo { background:var(--vermelho-suave); color:var(--vermelho); }',
    '.st-sem_ponto { background:var(--ambar-suave); color:#8A6204; }',
    '.st-zerado { background:var(--cinza-suave); color:var(--tinta-3); }',
    '.abc-A { background:var(--marca-suave); color:var(--marca); }',
    '.abc-B { background:var(--azul-suave); color:var(--azul); }',
    '.abc-C { background:var(--cinza-suave); color:var(--tinta-2); }',
    '.campo { display:flex; flex-direction:column; gap:5px; margin-bottom:12px; min-width:0; }',
    '.campo label { font-size:11px; font-weight:700; letter-spacing:.7px; text-transform:uppercase; color:var(--tinta-3); }',
    '.campo input, .campo select, .campo textarea { height:38px; width:100%; border:1px solid var(--linha); border-radius:var(--raio-p); background:var(--superficie-2); color:var(--tinta); font-family:var(--fonte); font-size:13.5px; padding:0 11px; outline:none; }',
    '.campo textarea { height:68px; padding:9px 11px; resize:vertical; }',
    '.campo input:focus, .campo select:focus, .campo textarea:focus { border-color:var(--marca); box-shadow:0 0 0 3px rgba(228,0,43,.12); }',
    '.campo-linha { display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:10px; }',
    '.campo-linha.tres { grid-template-columns:minmax(0,1.3fr) minmax(0,.8fr) minmax(0,.9fr); }',
    '@media (max-width:720px) { .campo-linha, .campo-linha.tres { grid-template-columns:1fr; } }',
    '.acoes-form { display:flex; gap:8px; flex-wrap:wrap; margin-top:4px; }',
    '.ajuda { font-size:12.5px; color:var(--tinta-2); margin:0 0 12px; line-height:1.5; }',
    '.barra-filtro { display:flex; flex-wrap:wrap; gap:8px 10px; align-items:flex-end; margin-bottom:12px; }',
    '.barra-filtro .campo { margin-bottom:0; min-width:140px; flex:1; }',
    '.chip-atalho { padding:7px 11px; font-size:12.5px; }',
    '.chip-atalho.ativo { background:var(--marca-suave); color:var(--marca); border-color:var(--marca); }',
    '.grade-cadastro { display:grid; grid-template-columns:minmax(0,380px) minmax(0,1fr); gap:14px; }',
    '@media (max-width:1100px) { .grade-cadastro { grid-template-columns:1fr; } }',
    '.painel-form { padding:18px; }',
    '.painel-form h3 { margin:0 0 12px; font-size:15px; letter-spacing:-.2px; }',
    '.drop-csv { border:1.5px dashed var(--linha-forte); border-radius:var(--raio); padding:22px 16px; text-align:center; color:var(--tinta-2); cursor:pointer; background:var(--superficie-2); }',
    '.drop-csv:hover, .drop-csv.sobre { border-color:var(--marca); background:var(--marca-suave); color:var(--marca); }',
    '.drop-csv strong { display:block; margin-bottom:4px; }',
    '.drop-csv span { font-size:12px; color:var(--tinta-3); }',
    '.vazio-estado { padding:48px 24px; text-align:center; color:var(--tinta-3); }',
    '.vazio-estado h3 { font-size:17px; font-weight:700; color:var(--tinta-2); margin:0 0 7px; }',
    '.vazio-estado p { font-size:13.5px; margin:0 auto; max-width:460px; line-height:1.6; }',
    '.esqueleto { background:linear-gradient(90deg,var(--superficie-3) 25%,var(--linha) 37%,var(--superficie-3) 63%); background-size:400% 100%; animation:brilho 1.4s ease infinite; border-radius:var(--raio); }',
    '@keyframes brilho { 0% { background-position:100% 50%; } 100% { background-position:0 50%; } }',
    '.toast { position:fixed; right:22px; bottom:22px; background:var(--tinta); color:#fff; padding:12px 16px; border-radius:var(--raio); font-size:13px; font-weight:600; box-shadow:var(--sombra-3); z-index:80; max-width:min(420px, calc(100vw - 36px)); }',
    '.toast.erro { background:var(--vermelho); }',
    '.rank-linha { display:grid; grid-template-columns:minmax(90px,1fr) minmax(60px,1.2fr) auto; gap:10px; align-items:center; margin-bottom:9px; }',
    '.rank-nome { font-size:13px; font-weight:650; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }',
    '.rank-trilha { height:8px; background:var(--superficie-3); border-radius:99px; overflow:hidden; }',
    '.rank-fill { height:100%; border-radius:99px; background:var(--marca); }',
    '.rank-fill.azul { background:var(--azul); }',
    '.rank-val { font-size:12.5px; font-weight:700; color:var(--tinta-2); text-align:right; }',
    '.abc-linha { display:flex; justify-content:space-between; gap:12px; padding:8px 0; border-bottom:1px solid var(--linha); font-size:13px; }',
    '.abc-linha:last-child { border-bottom:0; }',
    '.link { background:none; border:0; padding:0; color:var(--marca); font-family:var(--fonte); font-weight:700; font-size:12.5px; cursor:pointer; }',
    '@media (max-width:900px) {',
    '.casca { grid-template-columns:1fr; }',
    '.lateral { display:none; }',
    '.nav-topo { display:flex; }',
    '}'
  ].join('\n');
}

function cascaHtml_() {
  return [
    '<div class="casca" id="casca">',
    '<aside class="lateral">',
    '<div class="marca"><div class="marca-linha">',
    '<div class="marca-sigla" aria-hidden="true">EC</div>',
    '<button type="button" class="botao botao-sidebar" id="botao-sidebar" title="Recolher menu"></button>',
    '</div><div class="marca-textos">',
    '<div class="marca-nome" id="marca-nome">Estoque de Campo</div>',
    '<div class="marca-sub">Custódia dos técnicos</div>',
    '</div></div>',
    '<div class="cartao-usuario">',
    '<div class="avatar" id="usuario-iniciais">--</div>',
    '<div class="usuario-dados">',
    '<div class="usuario-nome" id="usuario-nome">Carregando</div>',
    '<div class="usuario-papel">Operação de campo</div>',
    '</div></div>',
    '<nav id="nav"></nav>',
    '<div id="caixa-pendencias" class="caixa-pendencias"></div>',
    '<div class="lateral-rodape">',
    '<div id="rodape-versao">&nbsp;</div>',
    '<div id="rodape-fonte">&nbsp;</div>',
    '<div id="rodape-planilha"></div>',
    '</div></aside>',
    '<main class="principal">',
    '<header class="topo"><div>',
    '<div class="topo-titulo" id="topo-titulo">&nbsp;</div>',
    '<div class="topo-sub" id="topo-sub">&nbsp;</div>',
    '</div><div class="topo-direita">',
    '<span class="pilula" id="pilula-estado"><span class="ponto"></span><span id="pilula-texto">Conectando</span></span>',
    '<button class="botao" id="botao-tela" type="button" title="Tela cheia"></button>',
    '<button class="botao primario" id="botao-atualizar" type="button"></button>',
    '</div></header>',
    '<div class="nav-topo" id="nav-topo"></div>',
    '<div class="area-conteudo"><div class="conteudo" id="conteudo">',
    '<div class="esqueleto" style="height:110px;margin-bottom:16px"></div>',
    '<div class="esqueleto" style="height:280px"></div>',
    '</div></div></main></div>'
  ].join('');
}

function clienteJs_() {
  return CLIENTE_JS.join('\n');
}

var CLIENTE_JS = [
"/* Estoque de Campo — cliente embutido. Sem crase de proposito. */",
"(function () {",
"  'use strict';",
"  var APP = { nome: 'Estoque de Campo', versao: '1.0.0' };",
"  var Estado = {",
"    contexto: null,",
"    vista: ((window.PARAMETROS && PARAMETROS.view) || 'painel').toLowerCase(),",
"    sidebarRecolhida: false,",
"    pendencias: 0,",
"    posicao: null,",
"    filtro: { busca: '', categoria: '', status: '', local: '' },",
"    form: { tipo: 'SAIDA' },",
"    itemForm: {},",
"    contagemLocal: '',",
"    historico: null,",
"    histFiltro: ''",
"  };",
"  var VISTAS = [",
"    { id: 'painel', titulo: 'Painel', sub: 'Disponível no depósito, custódia e ponto de pedido', icone: 'monitor' },",
"    { id: 'estoque', titulo: 'Posição', sub: 'Saldo por depósito e por técnico', icone: 'grade' },",
"    { id: 'movimentar', titulo: 'Movimentar', sub: 'Entrada, saída, devolução, consumo, baixa e transferência', icone: 'seta' },",
"    { id: 'tecnicos', titulo: 'Técnicos', sub: 'Quem carrega material e quais depósitos existem', icone: 'pessoa' },",
"    { id: 'historico', titulo: 'Histórico', sub: 'Livro de movimentações', icone: 'lista' },",
"    { id: 'contagem', titulo: 'Contagem', sub: 'Conferência física e ajuste do saldo', icone: 'check' },",
"    { id: 'cadastro', titulo: 'Cadastro', sub: 'Itens, ponto de pedido e CSV', icone: 'engrenagem' }",
"  ];",
"  var ICONES = {",
"    monitor: '<rect x=\"2\" y=\"3\" width=\"20\" height=\"14\" rx=\"2\"/><path d=\"M8 21h8M12 17v4\"/>',",
"    grade: '<rect x=\"3\" y=\"3\" width=\"7\" height=\"7\" rx=\"1.5\"/><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\" rx=\"1.5\"/><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\" rx=\"1.5\"/><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\" rx=\"1.5\"/>',",
"    seta: '<path d=\"M5 12h14\"/><path d=\"M13 6l6 6-6 6\"/>',",
"    pessoa: '<path d=\"M20 21a8 8 0 0 0-16 0\"/><circle cx=\"12\" cy=\"8\" r=\"3.2\"/>',",
"    lista: '<path d=\"M8 6h13M8 12h13M8 18h13\"/><path d=\"M3 6h.01M3 12h.01M3 18h.01\"/>',",
"    check: '<path d=\"M9 11l3 3L22 4\"/><path d=\"M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11\"/>',",
"    engrenagem: '<circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9c.3.6.9 1 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z\"/>',",
"    recarregar: '<path d=\"M21 12a9 9 0 1 1-2.6-6.4\"/><path d=\"M21 3v6h-6\"/>',",
"    expandir: '<path d=\"M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3\"/>',",
"    painelRecolher: '<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><path d=\"M9 3v18\"/><path d=\"M16 15l-3-3 3-3\"/>',",
"    painelExpandir: '<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><path d=\"M9 3v18\"/><path d=\"M14 9l3 3-3 3\"/>'",
"  };",
"  var AJUDA_TIPO = {",
"    ENTRADA: 'Recebimento no depósito. Entra no disponível. Se informar o custo, o custo médio do item é recalculado.',",
"    SAIDA: 'Sai do depósito e fica em poder do técnico. Durável é custódia: deve voltar. Consumível é estoque avançado.',",
"    DEVOLUCAO: 'O técnico devolve ao depósito. O saldo volta a contar no ponto de pedido.',",
"    CONSUMO: 'Baixa de consumível usado numa ordem de serviço. Durável não se consome por aqui.',",
"    BAIXA: 'Perda, avaria ou extravio. O saldo sai e não volta. O motivo fica no histórico.',",
"    TRANSFERENCIA: 'Move entre depósitos ou entre técnicos, sem consumir.'",
"  };",
"  var STATUS_ROTULO = { ok: 'Ok', abaixo: 'A repor', sem_ponto: 'Sem ponto', zerado: 'Zerado' };",
"",
"  function el(id) { return document.getElementById(id); }",
"  function esc(valor) {",
"    return String(valor === null || valor === undefined ? '' : valor)",
"      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;');",
"  }",
"  function icone(nome) {",
"    return '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\">' + (ICONES[nome] || '') + '</svg>';",
"  }",
"  function moeda(v) {",
"    return (Number(v) || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });",
"  }",
"  function qtd(v) {",
"    var n = Number(v) || 0;",
"    return n.toLocaleString('pt-BR', { maximumFractionDigits: 3 });",
"  }",
"  function dataCurta(texto) {",
"    var s = String(texto || '');",
"    if (s.length >= 16) return s.slice(8, 10) + '/' + s.slice(5, 7) + ' ' + s.slice(11, 16);",
"    return s;",
"  }",
"  function toast(msg, erro) {",
"    var antigo = document.querySelector('.toast');",
"    if (antigo) antigo.remove();",
"    var t = document.createElement('div');",
"    t.className = 'toast' + (erro ? ' erro' : '');",
"    t.textContent = msg;",
"    document.body.appendChild(t);",
"    setTimeout(function () { if (t.parentNode) t.remove(); }, 4200);",
"  }",
"  function chamar(nome, args, ok, falha) {",
"    if (window.google && google.script && google.script.run) {",
"      var runner = google.script.run.withSuccessHandler(ok).withFailureHandler(function (err) {",
"        falha((err && err.message) ? err.message : 'Falha ao falar com a planilha.');",
"      });",
"      runner[nome].apply(runner, args || []);",
"      return;",
"    }",
"    fetch((window.PREVIEW_API || '/api/') + nome, {",
"      method: 'POST',",
"      headers: { 'Content-Type': 'application/json' },",
"      body: JSON.stringify(args || [])",
"    }).then(function (r) { return r.json(); }).then(function (body) {",
"      if (!body || body.ok === false) falha((body && body.erro) || 'Falha');",
"      else ok(body.dados);",
"    }).catch(function (e) { falha(e && e.message ? e.message : String(e)); });",
"  }",
"  function vistaAtual() {",
"    for (var i = 0; i < VISTAS.length; i++) if (VISTAS[i].id === Estado.vista) return VISTAS[i];",
"    return VISTAS[0];",
"  }",
"  function montarMoldura() {",
"    var c = Estado.contexto;",
"    el('marca-nome').textContent = c.app.nome;",
"    el('usuario-nome').textContent = c.usuario.nome;",
"    el('usuario-nome').title = c.usuario.email || '';",
"    el('usuario-iniciais').textContent = c.usuario.iniciais;",
"    el('rodape-versao').textContent = c.app.nome + ' v' + c.app.versao;",
"    el('rodape-fonte').textContent = c.usuario.email || 'Perpétuo, com ponto de pedido';",
"    var link = el('rodape-planilha');",
"    link.innerHTML = c.planilhaUrl ? '<a href=\"' + esc(c.planilhaUrl) + '\" target=\"_blank\" rel=\"noopener\">Abrir planilha</a>' : '';",
"    document.title = c.app.nome;",
"    var html = '<div class=\"nav-titulo\">Operação</div>' + VISTAS.map(function (v) {",
"      return '<button type=\"button\" class=\"nav-item' + (v.id === Estado.vista ? ' ativo' : '') + '\" data-vista=\"' + v.id + '\" title=\"' + esc(v.titulo) + '\">' +",
"        icone(v.icone) + '<span>' + esc(v.titulo) + '</span></button>';",
"    }).join('');",
"    el('nav').innerHTML = html;",
"    el('nav-topo').innerHTML = VISTAS.map(function (v) {",
"      return '<button type=\"button\" class=\"nav-item' + (v.id === Estado.vista ? ' ativo' : '') + '\" data-vista=\"' + v.id + '\">' +",
"        icone(v.icone) + '<span>' + esc(v.titulo) + '</span></button>';",
"    }).join('');",
"    el('botao-atualizar').innerHTML = icone('recarregar') + '<span>Atualizar</span>';",
"    el('botao-tela').innerHTML = icone('expandir');",
"    atualizarBotaoSidebar();",
"    atualizarPendencias(c.abaixo || 0);",
"    definirPilula('ok', 'Planilha ligada');",
"  }",
"  function atualizarBotaoSidebar() {",
"    var botao = el('botao-sidebar');",
"    if (!botao) return;",
"    botao.innerHTML = icone(Estado.sidebarRecolhida ? 'painelExpandir' : 'painelRecolher');",
"    botao.title = Estado.sidebarRecolhida ? 'Expandir menu' : 'Recolher menu';",
"  }",
"  function atualizarPendencias(qtd) {",
"    Estado.pendencias = qtd || 0;",
"    var caixa = el('caixa-pendencias');",
"    if (!caixa) return;",
"    if (!qtd) { caixa.innerHTML = ''; return; }",
"    caixa.innerHTML = '<button type=\"button\" class=\"nav-item\" data-vista=\"estoque\" data-status=\"abaixo\">' +",
"      icone('check') + '<span>A repor</span><span class=\"sino-badge\">' + qtd + '</span></button>';",
"  }",
"  function definirPilula(classe, texto) {",
"    var p = el('pilula-estado');",
"    if (!p) return;",
"    p.className = 'pilula' + (classe ? ' ' + classe : '');",
"    var t = el('pilula-texto');",
"    if (t) t.textContent = texto || '';",
"  }",
"  function irPara(id, extra) {",
"    var achou = null;",
"    for (var i = 0; i < VISTAS.length; i++) if (VISTAS[i].id === id) achou = VISTAS[i];",
"    if (!achou) return;",
"    Estado.vista = id;",
"    if (extra && extra.status) {",
"      Estado.filtro.status = extra.status;",
"      Estado.filtro.local = '';",
"    }",
"    if (extra && extra.local) Estado.filtro.local = extra.local;",
"    if (extra && extra.busca) Estado.filtro.busca = extra.busca;",
"    Array.prototype.forEach.call(document.querySelectorAll('.nav-item[data-vista]'), function (item) {",
"      item.classList.toggle('ativo', item.getAttribute('data-vista') === id);",
"    });",
"    desenhar();",
"  }",
"  function desenhar() {",
"    var v = vistaAtual();",
"    el('topo-titulo').textContent = v.titulo;",
"    el('topo-sub').textContent = v.sub;",
"    el('conteudo').innerHTML = '<div class=\"esqueleto\" style=\"height:140px\"></div>';",
"    if (v.id === 'painel') carregarPainel();",
"    else if (v.id === 'estoque') carregarEstoque(false);",
"    else if (v.id === 'movimentar') carregarEstoque(true);",
"    else if (v.id === 'tecnicos') carregarEstoque(true);",
"    else if (v.id === 'historico') carregarHistorico();",
"    else if (v.id === 'contagem') carregarEstoque(true);",
"    else if (v.id === 'cadastro') carregarEstoque(true);",
"  }",
"  function carregarPainel() {",
"    chamar('apiPainel', [], function (p) {",
"      atualizarPendencias(p.kpis.abaixo);",
"      el('conteudo').innerHTML = desenharPainel(p);",
"    }, falhaVista);",
"  }",
"  function carregarEstoque(redesenhaVista) {",
"    chamar('apiEstoque', [], function (pos) {",
"      Estado.posicao = pos;",
"      var abaixo = 0;",
"      (pos.linhas || []).forEach(function (l) { if (l.ativo === '1' && l.status === 'abaixo') abaixo++; });",
"      atualizarPendencias(abaixo);",
"      var id = Estado.vista;",
"      if (id === 'estoque') el('conteudo').innerHTML = desenharEstoque();",
"      else if (id === 'movimentar') el('conteudo').innerHTML = desenharMovimento();",
"      else if (id === 'tecnicos') el('conteudo').innerHTML = desenharTecnicos();",
"      else if (id === 'contagem') el('conteudo').innerHTML = desenharContagem();",
"      else if (id === 'cadastro') el('conteudo').innerHTML = desenharCadastro();",
"      else if (!redesenhaVista) el('conteudo').innerHTML = desenharEstoque();",
"    }, falhaVista);",
"  }",
"  function carregarHistorico() {",
"    chamar('apiHistorico', [], function (h) {",
"      Estado.historico = h;",
"      el('conteudo').innerHTML = desenharHistorico();",
"    }, falhaVista);",
"  }",
"  function falhaVista(msg) {",
"    definirPilula('erro', 'Falha');",
"    el('conteudo').innerHTML = '<div class=\"aviso critico\">' + esc(msg) + '</div>';",
"  }",
"  function kpi(rotulo, valor, apoio, classe) {",
"    return '<div class=\"cartao kpi ' + (classe || '') + '\"><div class=\"kpi-rotulo\">' + esc(rotulo) + '</div>' +",
"      '<div class=\"kpi-valor num\">' + valor + '</div>' +",
"      (apoio ? '<div class=\"kpi-apoio\">' + apoio + '</div>' : '') + '</div>';",
"  }",
"  function seloStatus(st) {",
"    return '<span class=\"selo st-' + esc(st) + '\">' + esc(STATUS_ROTULO[st] || st) + '</span>';",
"  }",
"  function seloAbc(c) {",
"    if (!c) return '';",
"    return '<span class=\"selo abc-' + esc(c) + '\">' + esc(c) + '</span>';",
"  }",
"  function desenharPainel(p) {",
"    var k = p.kpis;",
"    var html = '<div class=\"aviso info\">O ponto de pedido olha a soma dos depósitos. O que está com o técnico já saiu do disponível: durável fica em custódia e consumível vira estoque avançado até o consumo na OS.</div>';",
"    html += '<div class=\"grade-kpi\">' +",
"      kpi('No depósito', moeda(k.valorDeposito), k.skus + ' SKUs ativos', 'destaque') +",
"      kpi('Com técnicos', moeda(k.valorTecnicos), 'Custódia e estoque avançado', '') +",
"      kpi('A repor', String(k.abaixo), k.semPonto + ' ainda sem ponto de pedido', k.abaixo ? 'vermelho' : 'verde') +",
"      kpi('Movimentos em 30 dias', String(k.movimentos30d), 'Fora a carga inicial', 'ambar') +",
"      '</div>';",
"    html += '<div class=\"grade-2\"><div class=\"cartao bloco\"><h3>Reposição</h3><div class=\"sub\">Quando o depósito chega no ponto de pedido, a quantidade sugerida repõe até duas vezes esse ponto.</div>';",
"    if (!p.alertas.length) html += '<div class=\"aviso ok\">Nenhum item no ponto de pedido ou abaixo dele.</div>';",
"    else {",
"      html += '<div class=\"tabela-wrap\"><table class=\"cadastro\"><thead><tr><th>SKU</th><th>Produto</th><th class=\"num\">Depósito</th><th class=\"num\">Ponto</th><th class=\"num\">Sugerido</th><th></th></tr></thead><tbody>';",
"      p.alertas.slice(0, 12).forEach(function (a) {",
"        html += '<tr><td class=\"sku\">' + esc(a.sku) + '</td><td>' + esc(a.produto) + '<div class=\"kpi-apoio\">' + esc(a.depositos) + '</div></td>' +",
"          '<td class=\"num\">' + qtd(a.qtdDeposito) + ' ' + esc(a.unidade) + '</td>' +",
"          '<td class=\"num\">' + qtd(a.minimo) + '</td><td class=\"num\">' + qtd(a.sugestao) + '</td><td>' + seloAbc(a.classeAbc) + '</td></tr>';",
"      });",
"      html += '</tbody></table></div>';",
"    }",
"    html += '</div><div class=\"cartao bloco\"><h3>Curva ABC</h3><div class=\"sub\">Pelo valor parado em estoque. Classe A concentra a maior parte do dinheiro.</div>';",
"    (p.abc || []).forEach(function (c) {",
"      html += '<div class=\"abc-linha\"><span>' + seloAbc(c.classe) + ' ' + c.itens + ' itens</span><span class=\"num\">' + moeda(c.valor) + ' · ' + String(c.pct).replace('.', ',') + '%</span></div>';",
"    });",
"    html += '<h3 style=\"margin-top:16px\">Em poder dos técnicos</h3>';",
"    if (!p.tecnicos.length) html += '<p class=\"ajuda\">Nenhum técnico cadastrado. A saída para campo precisa de um nome.</p>';",
"    else html += ranking(p.tecnicos.map(function (t) { return { nome: t.nome, valor: t.valor, rotulo: moeda(t.valor) }; }));",
"    html += '</div></div>';",
"    html += '<div class=\"cartao bloco\"><h3>Últimos lançamentos</h3><div class=\"sub\">' + depositosTexto_(p.depositos) + '</div>' +",
"      ((p.recentes && p.recentes.length) ? tabelaMovimentos(p.recentes) : '<p class=\"ajuda\">A carga inicial não aparece aqui. Entradas, saídas e consumos sim.</p>') + '</div>';",
"    return html;",
"  }",
"  function depositosTexto_(lista) {",
"    if (!lista || !lista.length) return 'Sem depósito.';",
"    return lista.map(function (d) { return d.nome + ': ' + moeda(d.valor); }).join(' · ');",
"  }",
"  function ranking(linhas) {",
"    var max = 1;",
"    linhas.forEach(function (l) { if ((l.valor || 0) > max) max = l.valor; });",
"    return linhas.map(function (l) {",
"      var w = Math.round(((l.valor || 0) / max) * 100);",
"      return '<div class=\"rank-linha\"><div class=\"rank-nome\">' + esc(l.nome) + '</div>' +",
"        '<div class=\"rank-trilha\"><div class=\"rank-fill\" style=\"width:' + w + '%\"></div></div>' +",
"        '<div class=\"rank-val num\">' + esc(l.rotulo) + '</div></div>';",
"    }).join('');",
"  }",
"  function tabelaMovimentos(lista) {",
"    if (!lista.length) return '<div class=\"vazio-estado\"><h3>Sem lançamentos</h3><p>As movimentações aparecem aqui.</p></div>';",
"    var html = '<div class=\"tabela-wrap\"><table class=\"cadastro\"><thead><tr><th>Quando</th><th>Doc</th><th>Tipo</th><th>Item</th><th class=\"num\">Qtd</th><th>De</th><th>Para</th><th>Motivo</th></tr></thead><tbody>';",
"    lista.forEach(function (m) {",
"      var sinal = m.tipo === 'AJUSTE' && m.direcao === 'SAI' ? '−' : (m.tipo === 'AJUSTE' ? '+' : '');",
"      html += '<tr><td class=\"num\">' + esc(dataCurta(m.quando)) + '</td><td>' + esc(m.documento || m.id) + '</td><td>' + esc(m.tipoRotulo) + '</td>' +",
"        '<td><span class=\"sku\">' + esc(m.sku) + '</span> ' + esc(m.produto) + '</td>' +",
"        '<td class=\"num\">' + sinal + qtd(m.qtd) + ' ' + esc(m.unidade) + '</td>' +",
"        '<td>' + esc(m.origem || '—') + '</td><td>' + esc(m.destino || '—') + '</td><td>' + esc(m.motivo || '') + '</td></tr>';",
"    });",
"    return html + '</tbody></table></div>';",
"  }",
"  function linhasFiltradas() {",
"    var f = Estado.filtro;",
"    var busca = semAcentoCli(f.busca);",
"    return (Estado.posicao.linhas || []).filter(function (l) {",
"      if (l.ativo !== '1' && Estado.vista === 'estoque') return false;",
"      if (f.categoria && l.categoria !== f.categoria) return false;",
"      if (f.status && l.status !== f.status) return false;",
"      if (f.local) {",
"        var tem = false;",
"        (l.locais || []).forEach(function (loc) { if (loc.id === f.local && loc.qtd > 0) tem = true; });",
"        if (!tem) return false;",
"      }",
"      if (!busca) return true;",
"      return semAcentoCli(l.sku + ' ' + l.produto + ' ' + l.ncm).indexOf(busca) >= 0;",
"    });",
"  }",
"  function semAcentoCli(s) {",
"    return String(s || '').toLowerCase()",
"      .replace(/[áàâã]/g, 'a').replace(/[éê]/g, 'e').replace(/í/g, 'i')",
"      .replace(/[óôõ]/g, 'o').replace(/ú/g, 'u').replace(/ç/g, 'c');",
"  }",
"  function opcoesLocais(tipo, selecionado, rotuloVazio) {",
"    var html = '<option value=\"\">' + esc(rotuloVazio || 'Selecione') + '</option>';",
"    (Estado.posicao.locais || []).forEach(function (l) {",
"      if (l.ativo !== '1') return;",
"      if (tipo && l.tipo !== tipo) return;",
"      html += '<option value=\"' + esc(l.id) + '\"' + (l.id === selecionado ? ' selected' : '') + '>' + esc(l.nome) + '</option>';",
"    });",
"    return html;",
"  }",
"  function opcoesItens(selecionado, soConsumivel) {",
"    var html = '<option value=\"\">Selecione o item</option>';",
"    (Estado.posicao.linhas || []).forEach(function (l) {",
"      if (l.ativo !== '1') return;",
"      if (soConsumivel && l.categoria !== 'Consumível') return;",
"      html += '<option value=\"' + esc(l.sku) + '\"' + (l.sku === selecionado ? ' selected' : '') + '>' + esc(l.sku + ' — ' + l.produto) + '</option>';",
"    });",
"    return html;",
"  }",
"  function desenharEstoque() {",
"    var f = Estado.filtro;",
"    var linhas = linhasFiltradas();",
"    var html = '<div class=\"barra-filtro\">' +",
"      '<div class=\"campo\"><label>Busca</label><input id=\"filtro-busca\" value=\"' + esc(f.busca) + '\" placeholder=\"SKU, produto ou NCM\"></div>' +",
"      '<div class=\"campo\"><label>Categoria</label><select id=\"filtro-cat\">' +",
"        '<option value=\"\">Todas</option><option value=\"Durável\"' + (f.categoria === 'Durável' ? ' selected' : '') + '>Durável</option>' +",
"        '<option value=\"Consumível\"' + (f.categoria === 'Consumível' ? ' selected' : '') + '>Consumível</option></select></div>' +",
"      '<div class=\"campo\"><label>Situação</label><select id=\"filtro-status\">' +",
"        '<option value=\"\">Todas</option>' +",
"        '<option value=\"abaixo\"' + (f.status === 'abaixo' ? ' selected' : '') + '>A repor</option>' +",
"        '<option value=\"sem_ponto\"' + (f.status === 'sem_ponto' ? ' selected' : '') + '>Sem ponto</option>' +",
"        '<option value=\"ok\"' + (f.status === 'ok' ? ' selected' : '') + '>Ok</option>' +",
"        '<option value=\"zerado\"' + (f.status === 'zerado' ? ' selected' : '') + '>Zerado</option></select></div>' +",
"      '<div class=\"campo\"><label>Com saldo em</label><select id=\"filtro-local\">' + opcoesLocais('', f.local, 'Todos os locais') + '</select></div>' +",
"      '<button type=\"button\" class=\"botao\" data-acao=\"exportar-posicao\">Exportar CSV</button></div>';",
"    html += '<div class=\"cartao\"><div class=\"tabela-wrap\"><table class=\"cadastro\"><thead><tr>' +",
"      '<th>SKU</th><th>Produto</th><th>Cat.</th><th>ABC</th><th class=\"num\">Depósito</th><th class=\"num\">Técnicos</th><th class=\"num\">Ponto</th><th>Situação</th><th class=\"num\">Valor</th>' +",
"      '</tr></thead><tbody>';",
"    if (!linhas.length) html += '<tr><td colspan=\"9\"><div class=\"vazio-estado\"><h3>Nada com esse filtro</h3><p>Troque a busca ou limpe a situação.</p></div></td></tr>';",
"    linhas.forEach(function (l) {",
"      var onde = (l.locais || []).filter(function (x) { return x.tipo === 'TECNICO'; }).map(function (x) {",
"        return x.nome + ' ' + qtd(x.qtd);",
"      }).join(', ');",
"      html += '<tr><td class=\"sku\">' + esc(l.sku) + '</td><td>' + esc(l.produto) +",
"        (onde ? '<div class=\"kpi-apoio\">' + esc(onde) + '</div>' : '') + '</td>' +",
"        '<td>' + esc(l.categoria === 'Consumível' ? 'Consumível' : 'Durável') + '</td><td>' + seloAbc(l.classeAbc) + '</td>' +",
"        '<td class=\"num\">' + qtd(l.qtdDeposito) + '</td><td class=\"num\">' + qtd(l.qtdTecnico) + '</td>' +",
"        '<td class=\"num\">' + (l.minimo > 0 ? qtd(l.minimo) : '—') + '</td><td>' + seloStatus(l.status) + '</td>' +",
"        '<td class=\"num\">' + moeda(l.valor) + '</td></tr>';",
"    });",
"    html += '</tbody></table></div></div>';",
"    return html;",
"  }",
"  function itemPorSku(sku) {",
"    var lista = (Estado.posicao && Estado.posicao.linhas) || [];",
"    for (var i = 0; i < lista.length; i++) if (lista[i].sku === sku) return lista[i];",
"    return null;",
"  }",
"  function saldoNoLocal(sku, localId) {",
"    var item = itemPorSku(sku);",
"    if (!item) return 0;",
"    var q = 0;",
"    (item.locais || []).forEach(function (l) { if (l.id === localId) q = l.qtd; });",
"    return q;",
"  }",
"  function desenharMovimento() {",
"    var f = Estado.form || { tipo: 'SAIDA' };",
"    var tipo = f.tipo || 'SAIDA';",
"    var soCons = tipo === 'CONSUMO';",
"    var html = '<div class=\"grade-cadastro\"><div class=\"cartao painel-form\"><h3>Novo lançamento</h3>' +",
"      '<p class=\"ajuda\" id=\"ajuda-tipo\">' + esc(AJUDA_TIPO[tipo] || '') + '</p>' +",
"      '<div class=\"campo\"><label>Tipo</label><select id=\"mov-tipo\">' +",
"        optTipo('ENTRADA', 'Entrada no depósito', tipo) +",
"        optTipo('SAIDA', 'Saída para técnico', tipo) +",
"        optTipo('DEVOLUCAO', 'Devolução do técnico', tipo) +",
"        optTipo('CONSUMO', 'Consumo em OS', tipo) +",
"        optTipo('BAIXA', 'Baixa (perda ou avaria)', tipo) +",
"        optTipo('TRANSFERENCIA', 'Transferência', tipo) +",
"      '</select></div>';",
"    html += '<div class=\"campo\"><label>Item</label><select id=\"mov-sku\">' + opcoesItens(f.sku || '', soCons) + '</select></div>';",
"    html += '<div class=\"campo-linha\">';",
"    if (tipo === 'ENTRADA') {",
"      html += '<div class=\"campo\"><label>Depósito</label><select id=\"mov-destino\">' + opcoesLocais('DEPOSITO', f.destinoId, 'Depósito') + '</select></div>';",
"    } else if (tipo === 'SAIDA') {",
"      html += '<div class=\"campo\"><label>Depósito</label><select id=\"mov-origem\">' + opcoesLocais('DEPOSITO', f.origemId, 'Depósito') + '</select></div>';",
"      html += '<div class=\"campo\"><label>Técnico</label><select id=\"mov-destino\">' + opcoesLocais('TECNICO', f.destinoId, 'Técnico') + '</select></div>';",
"    } else if (tipo === 'DEVOLUCAO') {",
"      html += '<div class=\"campo\"><label>Técnico</label><select id=\"mov-origem\">' + opcoesLocais('TECNICO', f.origemId, 'Técnico') + '</select></div>';",
"      html += '<div class=\"campo\"><label>Depósito</label><select id=\"mov-destino\">' + opcoesLocais('DEPOSITO', f.destinoId, 'Depósito') + '</select></div>';",
"    } else if (tipo === 'CONSUMO' || tipo === 'BAIXA') {",
"      html += '<div class=\"campo\"><label>Sai de</label><select id=\"mov-origem\">' + opcoesLocais('', f.origemId, 'Local') + '</select></div>';",
"    } else if (tipo === 'TRANSFERENCIA') {",
"      html += '<div class=\"campo\"><label>Origem</label><select id=\"mov-origem\">' + opcoesLocais('', f.origemId, 'Origem') + '</select></div>';",
"      html += '<div class=\"campo\"><label>Destino</label><select id=\"mov-destino\">' + opcoesLocais('', f.destinoId, 'Destino') + '</select></div>';",
"    }",
"    html += '</div>';",
"    html += '<div class=\"campo-linha tres\">' +",
"      '<div class=\"campo\"><label>Quantidade</label><input id=\"mov-qtd\" inputmode=\"decimal\" value=\"' + esc(f.qtd || '') + '\" placeholder=\"0\"></div>' +",
"      '<div class=\"campo\"><label>Documento / OS</label><input id=\"mov-doc\" value=\"' + esc(f.documento || '') + '\" placeholder=\"NF ou OS\"></div>' +",
"      (tipo === 'ENTRADA'",
"        ? '<div class=\"campo\"><label>Custo desta entrada</label><input id=\"mov-custo\" inputmode=\"decimal\" value=\"' + esc(f.custo || '') + '\" placeholder=\"Opcional\"></div>'",
"        : '<div class=\"campo\"><label>Motivo</label><input id=\"mov-motivo\" value=\"' + esc(f.motivo || '') + '\" placeholder=\"' + (tipo === 'BAIXA' ? 'Obrigatório' : 'Opcional') + '\"></div>') +",
"      '</div>';",
"    if (tipo === 'ENTRADA') {",
"      html += '<div class=\"campo\"><label>Motivo</label><input id=\"mov-motivo\" value=\"' + esc(f.motivo || '') + '\" placeholder=\"Compra, retorno de fornecedor...\"></div>';",
"    }",
"    html += '<p class=\"ajuda\" id=\"mov-disponivel\">' + esc(textoDisponivel(f)) + '</p>';",
"    html += '<div class=\"acoes-form\"><button type=\"button\" class=\"botao primario\" id=\"mov-gravar\" data-acao=\"gravar-mov\">Lançar</button></div></div>';",
"    html += '<div class=\"cartao bloco\"><h3>Como o saldo se move</h3>' +",
"      '<div class=\"abc-linha\"><span>Entrada</span><span>fornecedor → depósito</span></div>' +",
"      '<div class=\"abc-linha\"><span>Saída</span><span>depósito → técnico</span></div>' +",
"      '<div class=\"abc-linha\"><span>Devolução</span><span>técnico → depósito</span></div>' +",
"      '<div class=\"abc-linha\"><span>Consumo</span><span>sai do local, só consumível</span></div>' +",
"      '<div class=\"abc-linha\"><span>Baixa</span><span>sai do local, com motivo</span></div>' +",
"      '<div class=\"abc-linha\"><span>Transferência</span><span>local → local</span></div>' +",
"      '<p class=\"ajuda\" style=\"margin-top:12px\">O sistema recusa saldo negativo. Cada lançamento ganha um número e fica no histórico com quem operou.</p></div></div>';",
"    return html;",
"  }",
"  function optTipo(id, rotulo, atual) {",
"    return '<option value=\"' + id + '\"' + (id === atual ? ' selected' : '') + '>' + esc(rotulo) + '</option>';",
"  }",
"  function textoDisponivel(f) {",
"    if (!f || !f.sku) return 'Escolha o item para ver o saldo do local de origem.';",
"    var item = itemPorSku(f.sku);",
"    if (!item) return '';",
"    var origem = f.origemId;",
"    if (!origem) return item.sku + ' · depósito ' + qtd(item.qtdDeposito) + ' ' + item.unidade + ' · com técnicos ' + qtd(item.qtdTecnico) + '.';",
"    return 'Disponível em ' + nomeLocalCli(origem) + ': ' + qtd(saldoNoLocal(f.sku, origem)) + ' ' + item.unidade + '.';",
"  }",
"  function nomeLocalCli(id) {",
"    var lista = (Estado.posicao && Estado.posicao.locais) || [];",
"    for (var i = 0; i < lista.length; i++) if (lista[i].id === id) return lista[i].nome;",
"    return id;",
"  }",
"  function lerFormMov() {",
"    function v(id) { var n = el(id); return n ? n.value : ''; }",
"    Estado.form = {",
"      tipo: v('mov-tipo') || 'SAIDA',",
"      sku: v('mov-sku'),",
"      origemId: v('mov-origem'),",
"      destinoId: v('mov-destino'),",
"      qtd: v('mov-qtd'),",
"      documento: v('mov-doc'),",
"      motivo: v('mov-motivo'),",
"      custo: v('mov-custo')",
"    };",
"    return Estado.form;",
"  }",
"  function desenharTecnicos() {",
"    var locais = Estado.posicao.locais || [];",
"    var html = '<div class=\"grade-cadastro\"><div class=\"cartao painel-form\"><h3>Novo local</h3>' +",
"      '<p class=\"ajuda\">Técnico recebe saída e devolve. Depósito recebe entrada e é o que o ponto de pedido enxerga.</p>' +",
"      '<div class=\"campo\"><label>Nome</label><input id=\"loc-nome\" placeholder=\"Nome do técnico ou do depósito\"></div>' +",
"      '<div class=\"campo\"><label>Tipo</label><select id=\"loc-tipo\"><option value=\"TECNICO\">Técnico</option><option value=\"DEPOSITO\">Depósito</option></select></div>' +",
"      '<button type=\"button\" class=\"botao primario\" data-acao=\"salvar-local\">Adicionar</button></div>';",
"    html += '<div class=\"cartao bloco\"><h3>Locais</h3><div class=\"tabela-wrap\"><table class=\"cadastro\"><thead><tr><th>Nome</th><th>Tipo</th><th class=\"num\">Itens</th><th class=\"num\">Qtd</th><th class=\"num\">Valor</th><th></th></tr></thead><tbody>';",
"    locais.forEach(function (l) {",
"      var skus = 0, q = 0, valor = 0;",
"      (Estado.posicao.linhas || []).forEach(function (item) {",
"        (item.locais || []).forEach(function (loc) {",
"          if (loc.id === l.id && loc.qtd > 0) { skus++; q += loc.qtd; valor += loc.qtd * item.custo; }",
"        });",
"      });",
"      html += '<tr class=\"' + (l.ativo === '1' ? '' : 'inativa') + '\"><td>' + esc(l.nome) + '</td><td>' + (l.tipo === 'TECNICO' ? 'Técnico' : 'Depósito') + '</td>' +",
"        '<td class=\"num\">' + skus + '</td><td class=\"num\">' + qtd(q) + '</td><td class=\"num\">' + moeda(valor) + '</td><td>' +",
"        (q > 0 ? '<button type=\"button\" class=\"link\" data-acao=\"ver-carga\" data-id=\"' + esc(l.id) + '\">Ver carga</button>' : '') +",
"        (l.ativo === '1'",
"          ? ' <button type=\"button\" class=\"link\" data-acao=\"inativar-local\" data-id=\"' + esc(l.id) + '\">Inativar</button>'",
"          : ' <button type=\"button\" class=\"link\" data-acao=\"reativar-local\" data-id=\"' + esc(l.id) + '\">Reativar</button>') +",
"        '</td></tr>';",
"    });",
"    html += '</tbody></table></div></div></div>';",
"    return html;",
"  }",
"  function listaHistorico() {",
"    var lista = (Estado.historico && Estado.historico.movimentos) || [];",
"    var busca = semAcentoCli(Estado.histFiltro);",
"    if (!busca) return lista;",
"    return lista.filter(function (m) {",
"      return semAcentoCli([m.sku, m.produto, m.tipoRotulo, m.documento, m.motivo, m.origem, m.destino, m.usuario].join(' ')).indexOf(busca) >= 0;",
"    });",
"  }",
"  function desenharHistorico() {",
"    var aviso = (Estado.historico && Estado.historico.recorte) ? '<div class=\"aviso atencao\">Mostrando os 400 lançamentos mais recentes.</div>' : '';",
"    return aviso + '<div class=\"barra-filtro\"><div class=\"campo\"><label>Busca</label><input id=\"hist-busca\" value=\"' + esc(Estado.histFiltro) + '\" placeholder=\"SKU, OS, técnico, motivo\"></div>' +",
"      '<button type=\"button\" class=\"botao\" data-acao=\"exportar-hist\">Exportar CSV</button></div>' +",
"      '<div class=\"cartao bloco\" id=\"hist-tabela\">' + tabelaMovimentos(listaHistorico()) + '</div>';",
"  }",
"  function desenharContagem() {",
"    var localId = Estado.contagemLocal || '';",
"    var html = '<div class=\"aviso info\">Informe a quantidade física só nas linhas contadas. Em branco não altera o livro. A diferença vira ajuste, com documento.</div>';",
"    html += '<div class=\"barra-filtro\"><div class=\"campo\"><label>Local</label><select id=\"cont-local\">' + opcoesLocais('', localId, 'Escolha o local') + '</select></div>' +",
"      '<div class=\"campo\"><label>Documento</label><input id=\"cont-doc\" placeholder=\"Contagem de hoje\"></div>' +",
"      '<button type=\"button\" class=\"botao\" data-acao=\"copiar-livro\">Copiar saldo do livro</button>' +",
"      '<button type=\"button\" class=\"botao primario\" data-acao=\"lancar-contagem\">Lançar diferenças</button></div>';",
"    if (!localId) return html + '<div class=\"cartao vazio-estado\"><h3>Escolha um local</h3><p>Depósito ou técnico. Conte o que está fisicamente ali.</p></div>';",
"    var linhas = (Estado.posicao.linhas || []).filter(function (l) { return l.ativo === '1'; });",
"    html += '<div class=\"cartao\"><div class=\"tabela-wrap\"><table class=\"cadastro\"><thead><tr><th>SKU</th><th>Produto</th><th class=\"num\">Livro</th><th class=\"num\">Contado</th></tr></thead><tbody>';",
"    linhas.forEach(function (l) {",
"      var livro = saldoNoLocal(l.sku, localId);",
"      html += '<tr><td class=\"sku\">' + esc(l.sku) + '</td><td>' + esc(l.produto) + '</td>' +",
"        '<td class=\"num\">' + qtd(livro) + ' ' + esc(l.unidade) + '</td>' +",
"        '<td class=\"num\"><input class=\"cont-fisica\" data-sku=\"' + esc(l.sku) + '\" inputmode=\"decimal\" placeholder=\"\" style=\"width:110px;height:34px;border:1px solid var(--linha);border-radius:8px;padding:0 8px;text-align:right;font:inherit\"></td></tr>';",
"    });",
"    html += '</tbody></table></div></div>';",
"    return html;",
"  }",
"  function desenharCadastro() {",
"    var f = Estado.itemForm || {};",
"    var html = '<div class=\"grade-cadastro\"><div><div class=\"cartao painel-form\"><h3>' + (f.sku ? 'Editar item' : 'Novo item') + '</h3>' +",
"      '<div class=\"campo-linha\"><div class=\"campo\"><label>SKU</label><input id=\"item-sku\" value=\"' + esc(f.sku || '') + '\"' + (f.travarSku ? ' readonly' : '') + '></div>' +",
"      '<div class=\"campo\"><label>Categoria</label><select id=\"item-cat\">' +",
"        '<option value=\"Durável\"' + (f.categoria !== 'Consumível' ? ' selected' : '') + '>Durável</option>' +",
"        '<option value=\"Consumível\"' + (f.categoria === 'Consumível' ? ' selected' : '') + '>Consumível</option></select></div></div>' +",
"      '<div class=\"campo\"><label>Produto</label><input id=\"item-produto\" value=\"' + esc(f.produto || '') + '\"></div>' +",
"      '<div class=\"campo-linha tres\"><div class=\"campo\"><label>Unidade</label><input id=\"item-un\" value=\"' + esc(f.unidade || 'Un') + '\"></div>' +",
"      '<div class=\"campo\"><label>NCM</label><input id=\"item-ncm\" value=\"' + esc(f.ncm || '') + '\"></div>' +",
"      '<div class=\"campo\"><label>Custo médio</label><input id=\"item-custo\" value=\"' + esc(f.custo === undefined || f.custo === '' ? '' : String(f.custo).replace('.', ',')) + '\"></div></div>' +",
"      '<div class=\"campo-linha\"><div class=\"campo\"><label>Ponto de pedido</label><input id=\"item-min\" value=\"' + esc(f.minimo === undefined || f.minimo === '' ? '' : String(f.minimo).replace('.', ',')) + '\" placeholder=\"Só depósito\"></div>' +",
"      '<div class=\"campo\"><label>Ativo</label><select id=\"item-ativo\"><option value=\"1\"' + (f.ativo === '0' ? '' : ' selected') + '>Sim</option><option value=\"0\"' + (f.ativo === '0' ? ' selected' : '') + '>Não</option></select></div></div>' +",
"      '<div class=\"acoes-form\"><button type=\"button\" class=\"botao primario\" data-acao=\"salvar-item\">Salvar item</button>' +",
"      '<button type=\"button\" class=\"botao\" data-acao=\"limpar-item\">Limpar</button></div></div>' +",
"      '<div class=\"cartao painel-form\" style=\"margin-top:14px\"><h3>CSV</h3>' +",
"      '<p class=\"ajuda\">Aceita o arquivo de estoque com SKU interno, produto, categoria, NCM, estoque atual, unidade, custo e depósito. Marca no nome do depósito é ignorada; o saldo lançado é o do depósito, não o do técnico.</p>' +",
"      '<div class=\"drop-csv\" id=\"drop-csv\"><strong>Soltar o CSV aqui</strong><span>ou clique para escolher</span></div>' +",
"      '<input id=\"arquivo-csv\" type=\"file\" accept=\".csv,text/csv\" hidden>' +",
"      '<label class=\"ajuda\" style=\"display:flex;align-items:center;gap:8px;text-transform:none;letter-spacing:0\"><input id=\"csv-saldos\" type=\"checkbox\" checked> Lançar diferença de saldo do depósito</label>' +",
"      '<div class=\"acoes-form\"><button type=\"button\" class=\"botao\" data-acao=\"sugerir-minimos\">Sugerir pontos de pedido</button></div>' +",
"      '<p class=\"ajuda\">A sugestão vale só para item sem ponto: 20% do saldo no depósito, no mínimo 1. Não mexe no que já foi definido.</p></div></div>';",
"    html += '<div class=\"cartao bloco\"><h3>Itens</h3><div class=\"tabela-wrap\"><table class=\"cadastro\"><thead><tr><th>SKU</th><th>Produto</th><th>Cat.</th><th class=\"num\">Custo</th><th class=\"num\">Ponto</th><th></th></tr></thead><tbody>';",
"    (Estado.posicao.linhas || []).forEach(function (l) {",
"      html += '<tr class=\"' + (l.ativo === '1' ? '' : 'inativa') + '\"><td class=\"sku\">' + esc(l.sku) + '</td><td>' + esc(l.produto) + '</td><td>' + esc(l.categoria) + '</td>' +",
"        '<td class=\"num\">' + moeda(l.custo) + '</td><td class=\"num\">' + (l.minimo > 0 ? qtd(l.minimo) : '—') + '</td>' +",
"        '<td><button type=\"button\" class=\"link\" data-acao=\"editar-item\" data-sku=\"' + esc(l.sku) + '\">Editar</button></td></tr>';",
"    });",
"    html += '</tbody></table></div></div></div>';",
"    return html;",
"  }",
"  function numeroCampo(id) {",
"    var n = el(id);",
"    if (!n) return '';",
"    var s = String(n.value || '').trim();",
"    if (!s) return '';",
"    return s.replace(/\\./g, '').replace(',', '.');",
"  }",
"  function executarAcao(acao, ev) {",
"    var nome = acao.getAttribute('data-acao');",
"    if (nome === 'gravar-mov') return gravarMov();",
"    if (nome === 'salvar-local') return salvarLocal();",
"    if (nome === 'inativar-local') return mudarLocal(acao.getAttribute('data-id'), false);",
"    if (nome === 'reativar-local') return mudarLocal(acao.getAttribute('data-id'), true);",
"    if (nome === 'ver-carga') return irPara('estoque', { local: acao.getAttribute('data-id') });",
"    if (nome === 'exportar-posicao') return exportarPosicao();",
"    if (nome === 'exportar-hist') return exportarHist();",
"    if (nome === 'copiar-livro') return copiarLivro();",
"    if (nome === 'lancar-contagem') return lancarContagem();",
"    if (nome === 'salvar-item') return salvarItem();",
"    if (nome === 'limpar-item') { Estado.itemForm = {}; el('conteudo').innerHTML = desenharCadastro(); return; }",
"    if (nome === 'editar-item') return editarItem(acao.getAttribute('data-sku'));",
"    if (nome === 'sugerir-minimos') return sugerirMinimos();",
"  }",
"  function gravarMov() {",
"    var f = lerFormMov();",
"    var pedido = {",
"      tipo: f.tipo,",
"      sku: f.sku,",
"      origemId: f.origemId,",
"      destinoId: f.destinoId,",
"      qtd: String(f.qtd || '').trim().replace(/\\./g, '').replace(',', '.'),",
"      documento: f.documento,",
"      motivo: f.motivo,",
"      custo: f.custo ? String(f.custo).trim().replace(/\\./g, '').replace(',', '.') : ''",
"    };",
"    var botao = el('mov-gravar');",
"    if (botao) botao.disabled = true;",
"    chamar('apiMovimentar', [pedido], function (r) {",
"      toast((r.mensagem || 'Lançado.') + (r.movimento && r.movimento.id ? ' ' + r.movimento.id : ''));",
"      Estado.form.qtd = '';",
"      carregarEstoque(true);",
"    }, function (msg) {",
"      if (botao) botao.disabled = false;",
"      toast(msg, true);",
"    });",
"  }",
"  function salvarLocal() {",
"    var nome = (el('loc-nome') && el('loc-nome').value || '').trim();",
"    var tipo = el('loc-tipo') ? el('loc-tipo').value : 'TECNICO';",
"    chamar('apiSalvarLocal', [{ nome: nome, tipo: tipo }], function () {",
"      toast(tipo === 'TECNICO' ? 'Técnico adicionado.' : 'Depósito adicionado.');",
"      carregarEstoque(true);",
"    }, function (msg) { toast(msg, true); });",
"  }",
"  function mudarLocal(id, reativar) {",
"    if (!reativar && !window.confirm('Inativar este local?')) return;",
"    chamar(reativar ? 'apiReativarLocal' : 'apiInativarLocal', [id], function () {",
"      toast(reativar ? 'Local reativado.' : 'Local inativado.');",
"      carregarEstoque(true);",
"    }, function (msg) { toast(msg, true); });",
"  }",
"  function salvarItem() {",
"    var pedido = {",
"      sku: (el('item-sku') && el('item-sku').value || '').trim(),",
"      produto: (el('item-produto') && el('item-produto').value || '').trim(),",
"      categoria: el('item-cat') ? el('item-cat').value : 'Durável',",
"      unidade: (el('item-un') && el('item-un').value || '').trim(),",
"      ncm: (el('item-ncm') && el('item-ncm').value || '').trim(),",
"      custo: numeroCampo('item-custo') || 0,",
"      minimo: numeroCampo('item-min') || 0,",
"      ativo: el('item-ativo') ? el('item-ativo').value : '1'",
"    };",
"    chamar('apiSalvarItem', [pedido], function () {",
"      toast('Item salvo.');",
"      Estado.itemForm = {};",
"      carregarEstoque(true);",
"    }, function (msg) { toast(msg, true); });",
"  }",
"  function editarItem(sku) {",
"    var item = itemPorSku(sku);",
"    if (!item) return;",
"    Estado.itemForm = {",
"      sku: item.sku, produto: item.produto, categoria: item.categoria, unidade: item.unidade,",
"      ncm: item.ncm, custo: item.custo, minimo: item.minimo, ativo: item.ativo, travarSku: true",
"    };",
"    el('conteudo').innerHTML = desenharCadastro();",
"    var skuInput = el('item-sku');",
"    if (skuInput) skuInput.focus();",
"  }",
"  function sugerirMinimos() {",
"    if (!window.confirm('Definir ponto de pedido em 20% do saldo de depósito para itens que ainda estão sem ponto?')) return;",
"    chamar('apiSugerirMinimos', [], function (r) {",
"      toast(r.mensagem || 'Pontos atualizados.');",
"      carregarEstoque(true);",
"    }, function (msg) { toast(msg, true); });",
"  }",
"  function copiarLivro() {",
"    var localId = el('cont-local') ? el('cont-local').value : Estado.contagemLocal;",
"    if (!localId) { toast('Escolha o local.', true); return; }",
"    Array.prototype.forEach.call(document.querySelectorAll('.cont-fisica'), function (input) {",
"      input.value = String(saldoNoLocal(input.getAttribute('data-sku'), localId)).replace('.', ',');",
"    });",
"  }",
"  function lancarContagem() {",
"    var localId = el('cont-local') ? el('cont-local').value : '';",
"    if (!localId) { toast('Escolha o local.', true); return; }",
"    var linhas = [];",
"    Array.prototype.forEach.call(document.querySelectorAll('.cont-fisica'), function (input) {",
"      var s = String(input.value || '').trim();",
"      if (!s) return;",
"      linhas.push({ sku: input.getAttribute('data-sku'), fisica: s.replace(/\\./g, '').replace(',', '.') });",
"    });",
"    if (!linhas.length) { toast('Preencha ao menos uma quantidade contada.', true); return; }",
"    chamar('apiContagem', [{ localId: localId, documento: (el('cont-doc') && el('cont-doc').value) || 'CONTAGEM', linhas: linhas }], function (r) {",
"      toast(r.mensagem || 'Contagem lançada.');",
"      carregarEstoque(true);",
"    }, function (msg) { toast(msg, true); });",
"  }",
"  function exportarPosicao() {",
"    var linhas = [['SKU', 'Produto', 'Categoria', 'Unidade', 'NCM', 'Custo', 'Ponto de pedido', 'Deposito', 'Tecnicos', 'Total', 'Situacao', 'Classe', 'Valor']];",
"    linhasFiltradas().forEach(function (l) {",
"      linhas.push([l.sku, l.produto, l.categoria, l.unidade, l.ncm, l.custo, l.minimo, l.qtdDeposito, l.qtdTecnico, l.qtdTotal, STATUS_ROTULO[l.status] || l.status, l.classeAbc, l.valor]);",
"    });",
"    baixarCsv('posicao-estoque.csv', linhas);",
"  }",
"  function exportarHist() {",
"    var linhas = [['ID', 'Quando', 'Tipo', 'SKU', 'Produto', 'Quantidade', 'Direcao', 'Origem', 'Destino', 'Documento', 'Motivo', 'Usuario', 'Valor']];",
"    ((Estado.historico && Estado.historico.movimentos) || []).forEach(function (m) {",
"      linhas.push([m.id, m.quando, m.tipoRotulo, m.sku, m.produto, m.qtd, m.direcao, m.origem, m.destino, m.documento, m.motivo, m.usuario, m.valor]);",
"    });",
"    baixarCsv('historico-estoque.csv', linhas);",
"  }",
"  function baixarCsv(nome, linhas) {",
"    var csv = linhas.map(function (row) {",
"      return row.map(function (c) {",
"        var s = String(c === null || c === undefined ? '' : c);",
"        if (/[\";\\n]/.test(s)) return '\"' + s.replace(/\"/g, '\"\"') + '\"';",
"        return s;",
"      }).join(';');",
"    }).join('\\n');",
"    var blob = new Blob(['\\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });",
"    var a = document.createElement('a');",
"    a.href = URL.createObjectURL(blob);",
"    a.download = nome;",
"    document.body.appendChild(a);",
"    a.click();",
"    a.remove();",
"  }",
"  function lerArquivo(file) {",
"    var reader = new FileReader();",
"    reader.onload = function () {",
"      var texto = '';",
"      try { texto = new TextDecoder('utf-8', { fatal: true }).decode(reader.result); }",
"      catch (e) { texto = new TextDecoder('windows-1252').decode(reader.result); }",
"      var atualizar = !(el('csv-saldos') && !el('csv-saldos').checked);",
"      chamar('apiImportarCsv', [{ texto: texto, atualizarSaldos: atualizar }], function (r) {",
"        var msg = (r.criados || 0) + ' novos, ' + (r.atualizados || 0) + ' atualizados, ' + (r.ajustes || 0) + ' ajustes de saldo.';",
"        if (r.erros && r.erros.length) msg += ' Avisos: ' + r.erros.slice(0, 3).join(' ');",
"        toast(msg, !!(r.erros && r.erros.length));",
"        carregarEstoque(true);",
"      }, function (msg) { toast(msg, true); });",
"    };",
"    reader.readAsArrayBuffer(file);",
"  }",
"  function iniciar() {",
"    try { Estado.sidebarRecolhida = localStorage.getItem('estoque-campo.sidebar') === '1'; } catch (e) {}",
"    el('casca').classList.toggle('sidebar-recolhida', Estado.sidebarRecolhida);",
"    el('botao-sidebar').addEventListener('click', function () {",
"      Estado.sidebarRecolhida = !Estado.sidebarRecolhida;",
"      try { localStorage.setItem('estoque-campo.sidebar', Estado.sidebarRecolhida ? '1' : '0'); } catch (e) {}",
"      el('casca').classList.toggle('sidebar-recolhida', Estado.sidebarRecolhida);",
"      atualizarBotaoSidebar();",
"    });",
"    el('botao-atualizar').addEventListener('click', function () { desenhar(); });",
"    el('botao-tela').addEventListener('click', function () {",
"      var alvo = document.documentElement;",
"      if (!document.fullscreenElement && alvo.requestFullscreen) alvo.requestFullscreen();",
"      else if (document.exitFullscreen) document.exitFullscreen();",
"    });",
"    document.body.addEventListener('click', function (ev) {",
"      var vista = ev.target.closest ? ev.target.closest('[data-vista]') : null;",
"      if (vista) {",
"        irPara(vista.getAttribute('data-vista'), { status: vista.getAttribute('data-status') || '' });",
"        return;",
"      }",
"      var acao = ev.target.closest ? ev.target.closest('[data-acao]') : null;",
"      if (acao) executarAcao(acao, ev);",
"      var drop = ev.target.closest ? ev.target.closest('#drop-csv') : null;",
"      if (drop) { var arq = el('arquivo-csv'); if (arq) arq.click(); }",
"    });",
"    document.body.addEventListener('change', function (ev) {",
"      var t = ev.target;",
"      if (!t || !t.id) return;",
"      if (t.id === 'filtro-cat' || t.id === 'filtro-status' || t.id === 'filtro-local') {",
"        Estado.filtro.categoria = el('filtro-cat') ? el('filtro-cat').value : '';",
"        Estado.filtro.status = el('filtro-status') ? el('filtro-status').value : '';",
"        Estado.filtro.local = el('filtro-local') ? el('filtro-local').value : '';",
"        el('conteudo').innerHTML = desenharEstoque();",
"      }",
"      if (t.id === 'mov-tipo' || t.id === 'mov-sku' || t.id === 'mov-origem' || t.id === 'mov-destino') {",
"        lerFormMov();",
"        if (t.id === 'mov-tipo' || t.id === 'mov-sku' || t.id === 'mov-origem') {",
"          el('conteudo').innerHTML = desenharMovimento();",
"        } else {",
"          var d = el('mov-disponivel');",
"          if (d) d.textContent = textoDisponivel(Estado.form);",
"        }",
"      }",
"      if (t.id === 'cont-local') {",
"        Estado.contagemLocal = t.value;",
"        el('conteudo').innerHTML = desenharContagem();",
"      }",
"      if (t.id === 'arquivo-csv' && t.files && t.files[0]) lerArquivo(t.files[0]);",
"    });",
"    document.body.addEventListener('input', function (ev) {",
"      var t = ev.target;",
"      if (!t) return;",
"      if (t.id === 'filtro-busca') {",
"        Estado.filtro.busca = t.value;",
"        var corpo = el('conteudo').querySelector('tbody');",
"        if (!corpo) return;",
"        var tabela = corpo.parentNode;",
"        var cartao = el('conteudo').querySelector('.cartao');",
"        var novo = desenharEstoque();",
"        var temp = document.createElement('div');",
"        temp.innerHTML = novo;",
"        var novaTabela = temp.querySelector('.cartao');",
"        if (cartao && novaTabela) cartao.replaceWith(novaTabela);",
"        var busca = el('filtro-busca');",
"        if (busca) { var pos = busca.value.length; busca.focus(); busca.setSelectionRange(pos, pos); }",
"      }",
"      if (t.id === 'hist-busca') {",
"        Estado.histFiltro = t.value;",
"        var caixa = el('hist-tabela');",
"        if (caixa) caixa.innerHTML = tabelaMovimentos(listaHistorico());",
"      }",
"    });",
"    document.body.addEventListener('dragover', function (ev) {",
"      if (ev.target.closest && ev.target.closest('#drop-csv')) { ev.preventDefault(); ev.target.closest('#drop-csv').classList.add('sobre'); }",
"    });",
"    document.body.addEventListener('dragleave', function (ev) {",
"      var d = ev.target.closest && ev.target.closest('#drop-csv');",
"      if (d) d.classList.remove('sobre');",
"    });",
"    document.body.addEventListener('drop', function (ev) {",
"      var d = ev.target.closest && ev.target.closest('#drop-csv');",
"      if (!d) return;",
"      ev.preventDefault();",
"      d.classList.remove('sobre');",
"      if (ev.dataTransfer && ev.dataTransfer.files && ev.dataTransfer.files[0]) lerArquivo(ev.dataTransfer.files[0]);",
"    });",
"    chamar('apiContexto', [], function (c) {",
"      Estado.contexto = c;",
"      montarMoldura();",
"      desenhar();",
"    }, function (msg) {",
"      Estado.contexto = {",
"        app: APP,",
"        usuario: { nome: 'Operador', email: '', iniciais: 'OP' },",
"        planilhaUrl: '',",
"        abaixo: 0",
"      };",
"      montarMoldura();",
"      definirPilula('erro', 'Sem planilha');",
"      falhaVista(msg);",
"    });",
"  }",
"  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);",
"  else iniciar();",
"})();"
];


/* ===================================================================== export de teste (ignorado no Apps Script) */

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    APP: APP,
    SEMENTE_ITENS: SEMENTE_ITENS,
    baseInicial_: baseInicial_,
    criarServico_: criarServico_,
    aplicarMovimento_: aplicarMovimento_,
    classificarAbc_: classificarAbc_,
    normalizarDeposito_: normalizarDeposito_,
    normalizarCategoria_: normalizarCategoria_,
    parseNumeroBr_: parseNumeroBr_,
    parseCsv_: parseCsv_,
    importarLinhas_: importarLinhas_,
    montarPosicao_: montarPosicao_,
    montarPainel_: montarPainel_,
    sugerirMinimo_: sugerirMinimo_,
    paginaHtml_: paginaHtml_,
    htmlApp_: htmlApp_
  };
}
