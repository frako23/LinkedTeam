"""
Seed de datos de demostración: corretaje de seguros de vida y salud.

Uso (desde LinKedteam-backend, con la BD migrada):
    python seed.py            # crea/recrea los datos demo
    python seed.py --wipe     # solo borra los datos demo

Es idempotente: antes de insertar borra todo lo que pertenezca a los usuarios
con correo @corredoramedina.test, así que se puede correr varias veces sin
duplicar y sin tocar datos reales.

Clave de todos los usuarios:  Demo1234!
    carolina@corredoramedina.test   -> gerente (equipo de 4 asesores)
    rafael@corredoramedina.test     -> gerente (equipo de 2 asesores)
    valentina, andres, mariana, diego  @corredoramedina.test -> asesores de Carolina
    lucia, javier                      @corredoramedina.test -> asesores de Rafael
"""
import random
import sys
from datetime import date, datetime, timedelta, timezone

from dotenv import load_dotenv

load_dotenv()  # python puro no lee el .env como lo hace el CLI de flask

from app import app  # noqa: E402
from api.models import (
    db, User, Role, Status, Cliente, Color, Tarea, Client_Activity,
    TipoDeContacto, Courses, Products, Client_Products,
)
from api.routes import set_password

DOMAIN = "@corredoramedina.test"
PASSWORD = "Demo1234!"
HOY = date(2026, 10, 31)
random.seed(2026)


def dt(dias_atras, hora=10):
    """Datetime con zona horaria, `dias_atras` días antes de HOY."""
    d = HOY - timedelta(days=dias_atras)
    return datetime(d.year, d.month, d.day, hora, 0, tzinfo=timezone.utc)


def iso(dias_atras):
    return (HOY - timedelta(days=dias_atras)).isoformat()


def sin_tildes(texto):
    for a, b in zip("áéíóúñ", "aeioun"):
        texto = texto.replace(a, b)
    return texto


# ------------------------------ CATÁLOGO ---------------------------------- #
# (compañía, nombre, tipo, descripción). Cada asesor recibe su propia copia
# porque Products pertenece a un usuario.
CATALOGO = [
    ("Seguros Caracas", "Vida Total", "Vida",
     "Seguro de vida entera con valor de rescate y cobertura por fallecimiento e invalidez."),
    ("Seguros Caracas", "Salud Integral Plus", "Salud",
     "Cobertura de hospitalización, cirugía y maternidad con red de clínicas a nivel nacional."),
    ("Mapfre", "Vida Protección Familiar", "Vida",
     "Vida temporal a 20 años con cobertura por muerte accidental y enfermedades graves."),
    ("Mapfre", "Salud Familiar", "Salud",
     "Plan de salud familiar con suma asegurada de USD 100.000 y emergencias en el exterior."),
    ("Pan-American Life", "Vida Universal Flexible", "Vida",
     "Vida universal con componente de ahorro y primas flexibles."),
    ("Pan-American Life", "Salud Internacional", "Salud",
     "Cobertura médica internacional, deducible opcional y telemedicina incluida."),
    ("Seguros Universitas", "Salud Empresarial", "Salud",
     "Póliza colectiva de salud para PYMES, desde 5 asegurados."),
    ("Seguros Universitas", "Vida Educativa", "Vida",
     "Seguro de vida con fondo de estudios para hijos."),
]

# ------------------------------ PERSONAS ---------------------------------- #
GERENTES = [
    # nombre, apellido, prefijo del correo, meta de ventas (USD)
    ("Carolina", "Méndez", "carolina", 60000),
    ("Rafael", "Ortega", "rafael", 40000),
]
ASESORES = [
    # nombre, apellido, correo, gerente, meta, nº de clientes, perfil de cierre
    ("Valentina", "Rojas", "valentina", "carolina", 15000, 14, "alto"),
    ("Andrés", "Salazar", "andres", "carolina", 12000, 12, "medio"),
    ("Mariana", "Pérez", "mariana", "carolina", 10000, 10, "medio"),
    ("Diego", "Fuentes", "diego", "carolina", 8000, 6, "bajo"),  # asesor nuevo
    ("Lucía", "Herrera", "lucia", "rafael", 12000, 12, "alto"),
    ("Javier", "Campos", "javier", "rafael", 9000, 9, "medio"),
]

NOMBRES = [
    "María Fernanda Gómez", "José Luis Ramírez", "Ana Karina Torres", "Carlos Eduardo Silva",
    "Luisa Elena Contreras", "Pedro Antonio Navarro", "Gabriela Paredes", "Ricardo Alvarado",
    "Isabel Cristina Mora", "Héctor Manuel Blanco", "Patricia Delgado", "Alejandro Ibarra",
    "Daniela Quintero", "Miguel Ángel Rivas", "Verónica Sandoval", "Francisco Lara",
    "Claudia Marcano", "Eduardo Peña", "Rosa María Villalobos", "Gustavo Arias",
    "Andreína Colmenares", "Tomás Escobar", "Yulimar Figueroa", "Néstor Bravo",
    "Karla Montilla", "Oswaldo Guerrero", "Adriana Cedeño", "Juan Pablo Zambrano",
    "Mercedes Lugo", "Rodrigo Aponte", "Beatriz Camacho", "Sergio Maldonado",
    "Marisol Tovar", "Iván Pacheco", "Carmen Julia Urbina", "Wilmer Sequera",
    "Nathalie Briceño", "Arturo Linares", "Jessica Palacios", "Raúl Mendoza",
    "Elena Duarte", "Fabián Osorio", "Lorena Cabrera", "Jonathan Rangel",
    "Silvia Barrios", "Emilio Ferrer", "Tatiana Rondón", "Alberto Soto",
    "Paola Medina", "Ernesto Vivas", "Cecilia Arvelo", "Leonardo Peraza",
    "Mónica Salas", "Orlando Ruiz", "Génesis Montero", "Pablo Cordero",
    "Nelly Carrillo", "Samuel Bello", "Rebeca Suárez", "Martín Galindo",
    "Johana Pineda", "Édgar Lozada", "Maryori Páez", "Dante Rosales",
    "Alexandra Mijares", "Ramón Carvajal", "Yaritza Olivares", "Cristian Acosta",
    "Valeria Montañez", "Henry Castellano", "Liliana Ochoa", "Bruno Santaella",
    "Marlene Gil", "Aníbal Torrealba", "Soraya Valera", "Gerardo Pinto",
    "Irene Matute", "Jesús Alfonzo", "Zulay Rivero", "Camilo Betancourt",
    "Dayana Uzcátegui", "Franklin Dávila", "Nohelia Ponte", "Augusto Meza",
    "Estefanía Rangel", "Omar Lezama",
]

NOTAS = {
    "Vida": [
        "Padre de familia, dos hijos menores. Busca proteger los ingresos del hogar.",
        "Interesado en un fondo de estudios para sus hijos junto con la cobertura de vida.",
        "Emprendedor independiente, quiere cobertura por invalidez además de fallecimiento.",
        "Referido por un cliente actual. Pide comparar prima anual vs. mensual.",
    ],
    "Salud": [
        "Busca plan de salud familiar con maternidad. Compara con su póliza actual.",
        "Tiene seguro de la empresa pero quiere una póliza propia con mayor suma asegurada.",
        "Preocupado por enfermedades graves; antecedentes familiares de diabetes.",
        "Pequeño empresario, evalúa una póliza colectiva de salud para sus empleados.",
    ],
}

COMENTARIOS = {
    TipoDeContacto.llamada: [
        "Llamada de presentación. Quedó en revisar la propuesta con su pareja.",
        "Se resolvieron dudas sobre deducible y red de clínicas.",
        "Llamada de seguimiento: pide cotización por escrito.",
        "No contestó, se deja mensaje de voz.",
    ],
    TipoDeContacto.mensaje: [
        "Se envió cotización por WhatsApp con tres opciones de cobertura.",
        "Se compartió el brochure del plan y la tabla de primas.",
        "Recordatorio de la cita de mañana.",
        "Cliente confirma que firmará esta semana.",
    ],
    TipoDeContacto.cita: [
        "Primera reunión en oficina: levantamiento de necesidades y cuestionario de salud.",
        "Reunión de cierre: firma de solicitud y entrega de documentos.",
        "Presentación de propuesta en casa del cliente.",
        "Cita virtual por videollamada para revisar condiciones.",
    ],
}

# status válidos del tablero de tareas del frontend
TAREAS = [
    ("Llamar a clientes en etapa de negociación", "por realizar"),
    ("Enviar cotización de Salud Familiar", "por realizar"),
    ("Renovar póliza de cliente que vence este mes", "en ejecución"),
    ("Preparar presentación para primera cita", "por realizar"),
    ("Actualizar datos de contacto en el CRM", "realizado"),
    ("Cobrar cuota trimestral pendiente", "en ejecución"),
    ("Cita de seguimiento con referido", "realizado"),
    ("Revisar documentos médicos para suscripción", "por realizar"),
]

CURSOS = [
    ("Fundamentos de la venta de seguros de vida",
     "Cómo explicar el valor de un seguro de vida, manejar objeciones y cerrar con empatía.",
     "dQw4w9WgXcQ", "Ventas", Color.blue),
    ("Cómo vender seguros de salud paso a paso",
     "Detección de necesidades, comparación de planes y manejo de preexistencias.",
     "9bZkp7q19f0", "Ventas", Color.green),
    ("Prospección y referidos",
     "Estrategias para construir una cartera constante a partir de referidos y redes sociales.",
     "kJQP7kiw5Fk", "Prospección", Color.orange),
    ("Manejo de objeciones: \"es muy caro\"",
     "Técnicas para presentar la prima como inversión y no como gasto.",
     "3JZ_D3ELwOQ", "Ventas", Color.red),
    ("Uso del CRM LinkedTeam",
     "Recorrido por el embudo de ventas, tareas y registro de actividades.",
     "JGwWNGJdvx8", "Herramientas", Color.purple),
    ("Suscripción médica y documentación",
     "Qué pide la aseguradora, cómo llenar la solicitud y tiempos de respuesta.",
     "OPf0YbXqDm0", "Operaciones", Color.grey),
]

# Etapas del Kanban (Cliente.status) y peso por perfil de asesor
ETAPAS = ["Prospecto", "Contactado", "Primera Cita", "Negociación", "Cerrado"]
PESOS = {
    "alto": [2, 2, 2, 3, 6],
    "medio": [3, 3, 3, 3, 3],
    "bajo": [5, 3, 2, 1, 0],
}
ETIQUETAS = [Color.white, Color.blue, Color.green, Color.yellow,
             Color.orange, Color.pink, Color.purple, Color.red]


# ------------------------------ BORRADO ----------------------------------- #
def limpiar():
    ids = [u.id for u in User.query.filter(User.email.like(f"%{DOMAIN}"))]
    if not ids:
        return
    clientes = [c.id for c in Cliente.query.filter(Cliente.user_id.in_(ids))]
    productos = [p.id for p in Products.query.filter(Products.user_id.in_(ids))]
    if clientes:
        Client_Activity.query.filter(Client_Activity.client_id.in_(clientes)).delete(synchronize_session=False)
        Client_Products.query.filter(Client_Products.client_id.in_(clientes)).delete(synchronize_session=False)
    if productos:
        Client_Products.query.filter(Client_Products.product_id.in_(productos)).delete(synchronize_session=False)
    Client_Activity.query.filter(Client_Activity.user_id.in_(ids)).delete(synchronize_session=False)
    Cliente.query.filter(Cliente.user_id.in_(ids)).delete(synchronize_session=False)
    Products.query.filter(Products.user_id.in_(ids)).delete(synchronize_session=False)
    Tarea.query.filter(Tarea.user_id.in_(ids)).delete(synchronize_session=False)
    Courses.query.filter(Courses.manager_id.in_(ids)).delete(synchronize_session=False)
    User.query.filter(User.id.in_(ids)).delete(synchronize_session=False)
    db.session.commit()


# ------------------------------ CREACIÓN ---------------------------------- #
def crear_usuario(nombre, apellido, prefijo, role, meta=None, gerente=None):
    salt = f"seed-{prefijo}"
    user = User(
        name=nombre, lastname=apellido, email=f"{prefijo}{DOMAIN}",
        password=set_password(PASSWORD, salt), salt=salt, role=role,
        sales_goal=meta,
        manager=f"{gerente.name} {gerente.lastname}" if gerente else None,
        manager_id=gerente.id if gerente else None,
    )
    user.status = Status.active
    user.gpt_coins = 20
    user.created_at = dt(120)
    db.session.add(user)
    db.session.commit()
    return user


def crear_cliente(asesor, nombre, etapa):
    tipo = random.choice(["Vida", "Salud"])
    # prima anual esperada según el tipo de seguro
    monto = random.choice([600, 900, 1200, 1800, 2400, 3000] if tipo == "Vida"
                          else [800, 1400, 2000, 2800, 3600, 5000])
    antiguedad = {"Prospecto": random.randint(1, 20), "Contactado": random.randint(8, 35),
                  "Primera Cita": random.randint(15, 50), "Negociación": random.randint(20, 70),
                  "Cerrado": random.randint(30, 150)}[etapa]
    partes = nombre.split()
    cliente = Cliente(
        name=nombre,
        birthdate=date(random.randint(1960, 2000), random.randint(1, 12), random.randint(1, 28)).isoformat(),
        email=f"{sin_tildes(partes[0].lower())}.{sin_tildes(partes[-1].lower())}@correo.test",
        cellphone=f"0414{random.randint(1000000, 9999999)}",
        amount=str(monto),
        trust=random.choice(["Alta", "Alta", "Media", "Media", "Baja"]),
        notes=random.choice(NOTAS[tipo]),
        status=etapa,
        tag=random.choice(ETIQUETAS),
        user_id=asesor.id,
    )
    cliente.created_at = dt(antiguedad)
    cliente.updated_at = dt(max(antiguedad - random.randint(0, 10), 0))
    db.session.add(cliente)
    db.session.flush()
    return cliente, tipo, monto, antiguedad


def crear_actividades(asesor, cliente, etapa, antiguedad):
    # a mayor avance en el embudo, más interacciones
    n = {"Prospecto": 1, "Contactado": 2, "Primera Cita": 3, "Negociación": 4, "Cerrado": 5}[etapa]
    for i in range(n):
        if etapa != "Prospecto" and i == n - 2:
            tipo = TipoDeContacto.cita
        else:
            tipo = random.choice([TipoDeContacto.llamada, TipoDeContacto.mensaje])
        db.session.add(Client_Activity(
            date=iso(max(antiguedad - i * random.randint(2, 6), 0)),
            contact_type=tipo,
            comment=random.choice(COMENTARIOS[tipo]),
            user_id=asesor.id, client_id=cliente.id,
        ))


def cargar_cartera(usuario, nombres, n_clientes, perfil):
    """Productos propios + clientes en el embudo + actividades + pólizas vendidas."""
    productos = {}
    for compania, prod, tipo, desc in CATALOGO:
        p = Products.create(company=compania, product_name=prod, product_type=tipo,
                            product_description=desc, user_id=usuario.id)
        productos.setdefault(tipo, []).append(p)

    etapas = random.choices(ETAPAS, weights=PESOS[perfil], k=n_clientes)
    for i, e in enumerate(ETAPAS[:min(n_clientes, 4)]):
        etapas[i] = e  # al menos uno de cada etapa inicial
    if n_clientes >= 5:
        etapas[4] = "Cerrado"  # y al menos un cierre

    cierres = 0
    for etapa in etapas:
        cliente, tipo, monto, antiguedad = crear_cliente(usuario, nombres.pop(), etapa)
        crear_actividades(usuario, cliente, etapa, antiguedad)
        if etapa == "Cerrado":
            cierres += 1
            for _ in range(2 if random.random() < 0.25 else 1):  # algunos con 2 pólizas
                prod = random.choice(productos[tipo])
                db.session.add(Client_Products(
                    product_id=prod.id, client_id=cliente.id, amount=str(monto),
                    date_of_closing=iso(max(antiguedad - random.randint(0, 5), 0)),
                    notes=f"Póliza {prod.product_name} emitida y entregada al cliente.",
                    payment_recurrence=random.choice(["mensual", "trimestral", "semestral"]),
                ))
    db.session.commit()
    return len(etapas), cierres


def main():
    with app.app_context():
        limpiar()
        if "--wipe" in sys.argv:
            print("Datos demo eliminados.")
            return

        gerentes = {}
        for nombre, apellido, prefijo, meta in GERENTES:
            gerentes[prefijo] = crear_usuario(nombre, apellido, prefijo, Role.manager, meta)

        # Cursos: cada gerente asigna sus videos a su equipo
        for g in gerentes.values():
            for i, (titulo, desc, yt, cat, color) in enumerate(CURSOS):
                curso = Courses.create(
                    title=titulo, description=desc, manager_id=g.id, category=cat,
                    img_url=f"https://img.youtube.com/vi/{yt}/hqdefault.jpg",
                    link_url=f"https://www.youtube.com/watch?v={yt}",
                )
                curso.tag = color  # el constructor solo lo asigna si viene 'sales_goal'
                curso.created_at = dt(60 - i * 8)
            db.session.commit()

        nombres = NOMBRES[:]
        random.shuffle(nombres)
        resumen = []
        # los gerentes también venden: cartera propia para probar su embudo
        for u, n, perfil in [(g, 6, "medio") for g in gerentes.values()]:
            total, cierres = cargar_cartera(u, nombres, n, perfil)
            resumen.append((f"{u.name} {u.lastname} ({u.role.value})", total, cierres))
        for nombre, apellido, prefijo, gkey, meta, n_clientes, perfil in ASESORES:
            asesor = crear_usuario(nombre, apellido, prefijo, Role.associated, meta, gerentes[gkey])

            total, cierres = cargar_cartera(asesor, nombres, n_clientes, perfil)
            for tarea, estado in random.sample(TAREAS, 5):
                t = Tarea(task=tarea, status=estado, user_id=asesor.id)
                t.created_at = dt(random.randint(0, 20))
                db.session.add(t)
            db.session.commit()
            resumen.append((f"{nombre} {apellido}", total, cierres))

        for g in gerentes.values():
            for tarea, estado in random.sample(TAREAS, 3):
                db.session.add(Tarea(task=tarea, status=estado, user_id=g.id))
        db.session.commit()

        print("Seed completado.\n")
        print(f"Clave de todos los usuarios: {PASSWORD}")
        for g in GERENTES:
            print(f"  gerente : {g[2]}{DOMAIN}  ({g[0]} {g[1]})")
        for a in ASESORES:
            print(f"  asesor  : {a[2]}{DOMAIN}  ({a[0]} {a[1]}, gerente: {a[3]})")
        print("\nUsuario: clientes / cierres")
        for nombre, total, cierres in resumen:
            print(f"  {nombre:<32} {total:>3} / {cierres}")


if __name__ == "__main__":
    main()
