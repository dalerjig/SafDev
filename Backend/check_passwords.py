from app.security import hash_password, verify_password

passW="Dfrostm/17890_"

a=hash_password(passW)
print(verify_password(passW,a))

print(verify_password("lol",a))