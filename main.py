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
    atributo = forca_opcao(f'Qual atributo do(a) {escolha} deseja mudar?', ['quantidade', 'tipo'])
    if atributo == 'quantidade':
        
    

print('Sistema de estoque:')
escolha = forca_opcao('Qual operação deseja realizar?', ['adicionar', 'remover', 'atualizar', 'visualizar'])
if escolha == 'adicionar':
    adicionar()
elif escolha == 'remover':
    remover()
elif escolha == 'atualizar':
    atualizar()

print(estoque)