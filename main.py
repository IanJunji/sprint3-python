estoque = {
    'nome': ['lol', 'dota', 'cs'],
    'quantidade': [1, 3, 6],
    'tipo': ['jogo', 'jogo', 'jogo']
}

def forca_opcao(msg, lista):
    opcoes = '\n'.join(lista)
    escolha = input(f'{msg} \n{opcoes} \n-> ')
    while escolha not in lista:
        print('Opção invalida, por favor tente novamente.')
        escolha = input(f'{msg} \n{opcoes} \n-> ')
    return escolha

def adicionar():
    print('Estoque atual:')
    print(estoque)
    for key in estoque.keys():
        novo_item = input(f'Novo(a) {key}: ')
        estoque[key].append(novo_item)

def atualiza_indices():
    indices = {estoque['nome'][i]: i for i in range(len(estoque['nome']))}
    return indices

def remover():
    print('Estoque atual:')
    print(estoque)
    nome_remover = forca_opcao("Qual item você deseja remover?", estoque['nome'])
    indices = atualiza_indices()
    indice_remover = indices[nome_remover]
    for key in estoque.keys():
        estoque[key].pop(indice_remover)
    print('Estoque atualizado:')
    print(estoque)

# def visualizar():
#     print('Estoque atual:')
#     print(estoque)

def visualizar():
    print("\n=== Estoque Atual ===")
    print(f"{'Nome':<15} {'Quantidade':<10} {'Tipo':<10}")
    print("-" * 37)
    for i in range(len(estoque['nome'])):
        nome = estoque['nome'][i]
        quantidade = estoque['quantidade'][i]
        tipo = estoque['tipo'][i]
        print(f"{nome:<15} {quantidade:<10} {tipo:<10}")
    print("-" * 37)

print('Sistema de estoque:')

while True:
    escolha = forca_opcao('Qual operação deseja realizar?', ['adicionar', 'remover', 'atualizar', 'visualizar', 'sair'])
    if escolha == 'adicionar':
        adicionar()
    elif escolha == 'remover':
        remover()
    elif escolha == 'atualizar':
        atualizar()
    elif escolha == 'visualizar':
        visualizar()
    elif escolha == 'sair':
        print('Saindo do sistema...')
        break



print(estoque)


