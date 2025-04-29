import openpyxl

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

def forca_numero(msg):
    num = input(msg)
    while not num.isnumeric():
        print('Número invalido, tente novamente.')
        num = input(msg)
    num = int(num)
    return num

def adicionar():
    print('Estoque atual:')
    print(estoque)
    for key in estoque.keys():
        if key == 'quantidade':
            novo_item = forca_numero(f'Novo(a) {key}: ')
            estoque[key].append(novo_item)
        else:
            novo_item = input(f'Novo(a) {key}: ')
            estoque[key].append(novo_item)
    return

def atualizar():
    print('Estoque atual:')
    print(estoque)
    escolha = forca_opcao('Qual item deseja atualizar?', estoque['nome'])
    indices = atualiza_indices()
    indice = indices[escolha]
    atributo = forca_opcao(f'Qual atributo do(a) {escolha} deseja mudar?', ['nome', 'quantidade', 'tipo'])
    if atributo == 'nome':
        novo_nome = input('Novo nome: ')
        estoque[escolha][indice] = novo_nome
        print(f'Nome atualizado para: {novo_nome}')
    if atributo == 'quantidade':
        nova_quantidade = input(f'Nova quantidade (+/-): ')
        while not nova_quantidade.startswith('+' or '-') and not nova_quantidade[-1].isnumeric() and not nova_quantidade >= estoque[escolha][indice]:
            print('Valor invalido, por favor tente novamente.')
            nova_quantidade = input(f'Nova quantidade (+/-): ')
        if nova_quantidade.startswith('-'):
            estoque[escolha][indice] -= nova_quantidade
        else:
            estoque[escolha][indice] += nova_quantidade
            



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

print('Sistema de estoque:')
escolha = forca_opcao('Qual operação deseja realizar?', ['adicionar', 'remover', 'atualizar', 'visualizar'])
if escolha == 'adicionar':
    adicionar()
elif escolha == 'remover':
    remover()
elif escolha == 'atualizar':
    atualizar()
elif escolha == 'visualizar':
    visualizar()


print(estoque)


