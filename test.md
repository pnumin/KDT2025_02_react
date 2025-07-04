물론입니다. 오픈소스 LLM을 사용하여 RAG 시스템을 구축하는 방법을 상세히 알려드리겠습니다. 클라우드 기반 API(OpenAI 등)를 사용하는 대신, **로컬 컴퓨터나 개인 서버에서 직접 모델을 구동**하는 방식입니다.

오픈소스 모델을 사용하는 것의 가장 큰 장점은 **데이터 프라이버시**를 지킬 수 있고, API 호출에 따른 **비용이 발생하지 않는다**는 점입니다. 다만, 모델을 구동하기 위한 충분한 하드웨어(특히 GPU와 VRAM)가 필요합니다.

### 오픈소스 RAG 시스템 구축의 핵심 구성 요소

기존 OpenAI 기반 RAG 시스템에서 다음 두 가지 요소가 변경됩니다.

1.  **임베딩 모델:** OpenAI의 `text-embedding-3-small` 대신, HuggingFace 등에서 제공하는 오픈소스 임베딩 모델을 사용합니다.
2.  **LLM (생성 모델):** OpenAI의 `gpt-4o` 대신, 로컬에서 구동되는 오픈소스 LLM을 사용합니다.

여기서는 다음과 같은 인기 있는 오픈소스 도구를 사용할 것입니다.

-   **임베딩 모델:** `ko-sbert-nli` (한국어 성능이 좋은 모델)
-   **LLM 로더:** `Ollama` (오픈소스 LLM을 가장 쉽게 다운로드하고 실행할 수 있는 도구)
-   **LLM:** `gemma:2b` 또는 `qwen2:7b` (성능과 요구 사양의 균형이 좋은 모델)

---

### 1단계: Ollama 설치 및 모델 다운로드

`Ollama`는 마치 Docker처럼, 커맨드 한 줄로 다양한 오픈소스 LLM을 다운로드하고 로컬 API 서버로 실행시켜주는 환상적인 도구입니다.

1.  **Ollama 설치:**
    -   [Ollama 공식 홈페이지](https://ollama.com/)에 방문하여 본인의 OS(macOS, Linux, Windows)에 맞는 설치 프로그램을 다운로드하여 설치합니다.

2.  **Ollama 실행 확인:**
    -   설치가 완료되면 터미널(또는 CMD)을 열고 다음 명령어를 실행합니다. Ollama가 백그라운드에서 실행 중이어야 합니다.

3.  **LLM 모델 다운로드:**
    -   원하는 LLM을 다운로드합니다. 여기서는 Google의 `gemma:2b`를 예시로 사용하겠습니다. (VRAM 8GB 정도에서도 원활히 작동)
    -   더 높은 성능을 원한다면 `qwen2:7b` (Qwen 2 7B) 모델도 좋습니다.

    ```bash
    # Gemma 2B 모델 다운로드 (첫 실행 시 시간이 걸립니다)
    ollama pull gemma:2b

    # (선택) Qwen 2 7B 모델 다운로드
    ollama pull qwen2:7b
    ```

4.  **로컬 서버 테스트:**
    -   다운로드가 완료되면, Ollama가 자동으로 `http://localhost:11434` 주소에 API 서버를 엽니다. LangChain이 이 주소를 통해 모델과 통신하게 됩니다.

---

### 2단계: 환경 설정 및 라이브러리 설치

기존 `langchain`, `faiss-cpu`, `unstructured` 등은 그대로 사용합니다. 추가로 오픈소스 임베딩 모델을 위한 라이브러리를 설치합니다.

```bash
# 기존 라이브러리들은 이미 설치되었다고 가정합니다.
# langchain, faiss-cpu, "unstructured[pdf, ocr]" 등...

# 오픈소스 임베딩 모델을 위한 라이브러리 설치
pip install sentence-transformers
```

---

### 3단계: 오픈소스 모델을 사용한 RAG 파이썬 코드

이제 기존 코드를 수정하여 OpenAI 대신 로컬 모델을 사용하도록 변경해 보겠습니다.

```python
import os
from langchain_community.document_loaders import UnstructuredPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings # OpenAIEmbeddings 대신 사용
from langchain_community.vectorstores import FAISS
from langchain_community.chat_models import ChatOllama # ChatOpenAI 대신 사용
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate

# --- 1. 문서 로딩 및 분할 (이전과 동일) ---
pdf_path = "your_textbook.pdf"
loader = UnstructuredPDFLoader(file_path=pdf_path, mode="paged")
documents = loader.load()

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)
chunks = text_splitter.split_documents(documents)

print(f"총 {len(chunks)}개의 청크로 분할 완료.")


# --- 2. 오픈소스 임베딩 모델 로드 ---
# HuggingFaceEmbeddings를 사용하여 한국어 임베딩 모델을 로드합니다.
# device='cpu'는 GPU가 없을 경우 CPU를 사용하라는 의미입니다. GPU가 있다면 'cuda'로 설정하세요.
print("오픈소스 임베딩 모델 로딩 중...")
model_name = "jhgan/ko-sbert-nli"
model_kwargs = {'device': 'cpu'}
encode_kwargs = {'normalize_embeddings': True}
embeddings = HuggingFaceEmbeddings(
    model_name=model_name,
    model_kwargs=model_kwargs,
    encode_kwargs=encode_kwargs
)
print("임베딩 모델 로딩 완료.")

# --- 3. 벡터 저장소 구축 (이전과 동일, 단 비용 발생 없음) ---
print("벡터 저장소 생성 중 (비용 발생 없음)...")
vector_store = FAISS.from_documents(chunks, embeddings)
print("벡터 저장소 생성 완료.")


# --- 4. 검색기 생성 (이전과 동일) ---
retriever = vector_store.as_retriever(search_kwargs={'k': 5})


# --- 5. 오픈소스 LLM 로드 및 체인 생성 ---
# ChatOllama를 사용하여 로컬에서 실행 중인 모델을 지정합니다.
print("Ollama를 통해 로컬 LLM 로딩 중...")
llm = ChatOllama(model="gemma:2b") # 1단계에서 다운로드한 모델 이름
print("로컬 LLM 로딩 완료.")

# 프롬프트 템플릿 (오픈소스 모델에 맞게 더 간단하게 만들 수 있음)
prompt_template = """
### Instruction:
주어진 문서를 바탕으로 질문에 답하세요. 문서에 없는 내용은 "알 수 없음"이라고 답하세요.

### Context:
{context}

### Question:
{question}

### Answer:
"""
PROMPT = PromptTemplate(
    template=prompt_template, input_variables=["context", "question"]
)

# RetrievalQA 체인 생성
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=retriever,
    chain_type_kwargs={"prompt": PROMPT},
    return_source_documents=True
)

# --- 6. 질의응답 실행 ---
print("\n--- 질의응답을 시작합니다 ---")
question = "4행정 디젤 기관의 장점은 무엇인가요?"
result = qa_chain.invoke(question)

print("\n### 최종 답변 ###")
print(f"질문: {result['query']}")
print(f"답변: {result['result']}")
print("\n[답변 근거 문서]")
for doc in result['source_documents']:
    print(f"- 출처: {doc.metadata.get('page_number', 'N/A')} 페이지")
```

### 코드 주요 변경점 요약

1.  **임베딩 모델 변경:**
    -   `from langchain_openai import OpenAIEmbeddings` -> `from langchain_community.embeddings import HuggingFaceEmbeddings`
    -   `OpenAIEmbeddings(...)` -> `HuggingFaceEmbeddings(model_name="jhgan/ko-sbert-nli", ...)`

2.  **LLM 변경:**
    -   `from langchain_openai import ChatOpenAI` -> `from langchain_community.chat_models import ChatOllama`
    -   `ChatOpenAI(model_name="gpt-4o", ...)` -> `ChatOllama(model="gemma:2b")`

### 하드웨어 고려사항

-   **RAM:** 16GB 이상을 권장합니다. 모델 로딩 및 문서 처리에 메모리가 필요합니다.
-   **GPU VRAM:** LLM의 성능은 VRAM에 크게 의존합니다.
    -   **~2B 모델 (gemma:2b):** 8GB VRAM으로 충분합니다.
    -   **~7B 모델 (qwen2:7b):** 12GB ~ 16GB VRAM을 권장합니다.
    -   **13B 이상 모델:** 24GB VRAM 이상이 필요할 수 있습니다.
-   **GPU가 없다면?** `model_kwargs = {'device': 'cpu'}`로 설정하여 CPU로 실행할 수 있지만, 임베딩 및 답변 생성 속도가 매우 느려집니다.

이제 이 코드를 실행하면, API 비용 없이 완전히 여러분의 컴퓨터 안에서 동작하는 RAG 시스템을 경험할 수 있습니다