from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get('/')
def index(request:Request, class_response=HTMLResponse):
    return templates.TemplateResponse(
        request,
        "index.html"
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", reload=True)
