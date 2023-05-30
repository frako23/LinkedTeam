"""empty message

Revision ID: 2f1cf3747ccc
Revises: d21e45f400d4
Create Date: 2023-05-29 13:27:37.950271

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2f1cf3747ccc'
down_revision = 'd21e45f400d4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('client__activity', schema=None) as batch_op:
        batch_op.add_column(sa.Column('client_id', sa.Integer(), nullable=False))
        batch_op.drop_constraint('client__activity_cliente_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'cliente', ['client_id'], ['id'])
        batch_op.drop_column('cliente_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('client__activity', schema=None) as batch_op:
        batch_op.add_column(sa.Column('cliente_id', sa.INTEGER(), autoincrement=False, nullable=False))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('client__activity_cliente_id_fkey', 'cliente', ['cliente_id'], ['id'])
        batch_op.drop_column('client_id')

    # ### end Alembic commands ###
