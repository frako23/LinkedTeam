"""empty message

Revision ID: 0d199a304335
Revises: fe2edffada5c
Create Date: 2024-04-25 19:24:29.161701

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0d199a304335'
down_revision = 'fe2edffada5c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('courses', schema=None) as batch_op:
        batch_op.add_column(sa.Column('tag', sa.Enum('white', 'black', 'blue', 'grey', 'green', 'yellow', 'orange', 'pink', 'purple', 'red', name='color'), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('courses', schema=None) as batch_op:
        batch_op.drop_column('tag')

    # ### end Alembic commands ###