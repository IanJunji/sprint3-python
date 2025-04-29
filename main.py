estoque = {
    'nome': [],
    'quantidade': [],
    'tipo': []
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




print('Sistema de estoque:')
escolha = forca_opcao('Qual operação deseja realizar?', ['adicionar', 'remover', 'atualizar', 'visualizar'])
if escolha == 'adicionar':
    adicionar()

print(estoque)