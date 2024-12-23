"""empty message

Revision ID: 55059ff3ebd4
Revises: 6c5033359fc1
Create Date: 2024-12-20 23:37:30.712666

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '55059ff3ebd4'
down_revision = '6c5033359fc1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_column('is_active')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_active', sa.BOOLEAN(), autoincrement=False, nullable=False))

    # ### end Alembic commands ###
