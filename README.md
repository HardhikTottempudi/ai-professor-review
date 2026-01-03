# 🎓 AI Professor Review Assistant

An intelligent **RAG (Retrieval-Augmented Generation) chatbot** that helps students find the best professors based on ratings and reviews. Built with Next.js, Google Gemini AI, and Pinecone vector database for semantic search.

## 🌟 Features

- **Semantic Search**: Find professors using natural language queries
- **RAG Architecture**: Combines vector search with AI generation for accurate responses
- **Real-time Streaming**: Live AI responses for better user experience
- **Professor Ratings**: Access to comprehensive professor reviews and ratings
- **Smart Recommendations**: Get personalized professor suggestions based on criteria
- **Subject-Specific Search**: Find professors by department or subject area
- **Conversational Interface**: Natural dialogue with context awareness
- **Beautiful UI**: Modern, responsive design with Material-UI

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (React 18)
- **AI Model**: Google Gemini AI (text-embedding-004, generative models)
- **Vector Database**: Pinecone (serverless)
- **UI Library**: Material-UI (MUI) with Emotion
- **Language**: JavaScript (ES6+)
- **Data Processing**: Python (Jupyter Notebook for data ingestion)
- **API Routes**: Next.js API endpoints

## 📋 Prerequisites

- Node.js 18.x or higher
- Python 3.10+ (for data loading)
- npm/yarn/pnpm/bun
- API Keys:
  - [Google Gemini API Key](https://makersuite.google.com/app/apikey)
  - [Pinecone API Key](https://www.pinecone.io/)

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/HardhikTottempudi/ai-professor-review.git
cd ai-professor-review
```

### 2. Install Node.js Dependencies
```bash
npm install
```

### 3. Install Python Dependencies
```bash
pip install -r requirements.txt
```

### 4. Set Up Environment Variables

Create a `.env.local` file:
```env
GEMINI_API_KEY=your_google_gemini_api_key
PINECONE_API_KEY=your_pinecone_api_key
```

### 5. Load Data into Pinecone

Run the Jupyter notebook to process and upload professor reviews:
```bash
jupyter notebook load.ipynb
```

This will:
- Read reviews from `reviews.json`
- Generate embeddings using Google's text-embedding-004 model
- Upload vectors to Pinecone with metadata (professor name, subject, rating, review text)

### 6. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 💡 How It Works

### RAG Architecture

1. **User Query**: Student asks about professors (e.g., "Find me a good CS professor")
2. **Embedding Generation**: Query is converted to vector embedding
3. **Semantic Search**: Pinecone retrieves most relevant professor reviews
4. **Context Assembly**: Retrieved reviews are formatted as context
5. **AI Generation**: Gemini generates response using retrieved context
6. **Streaming Response**: Answer streams back to user in real-time

### Data Flow
```
User Query
    ↓
Vector Embedding (Gemini)
    ↓
Pinecone Vector Search
    ↓
Retrieve Top-K Reviews
    ↓
RAG Prompt Construction
    ↓
Gemini AI Generation
    ↓
Streaming Response to UI
```

## 📊 Data Structure

### reviews.json Format
```json
{
  "reviews": [
    {
      "professor": "Dr. John Smith",
      "subject": "Computer Science",
      "stars": 5,
      "reviews": "Excellent professor, clear explanations..."
    }
  ]
}
```

### Pinecone Vector Structure
```python
{
  "id": "professor_name",
  "values": [embedding_vector],
  "metadata": {
    "review": "review_text",
    "subject": "subject_name",
    "stars": rating
  }
}
```

## 🎯 Key Features for Hiring Managers

- **RAG Implementation**: Shows understanding of advanced AI architectures
- **Vector Databases**: Proficiency with Pinecone and semantic search
- **AI Integration**: Multiple AI services (embeddings + generation)
- **Full-Stack Development**: Frontend, backend, and data pipeline
- **Data Engineering**: ETL pipeline for professor review data
- **Modern Architecture**: Next.js App Router, streaming responses
- **Production-Ready**: Scalable vector database with serverless architecture

## 📖 Project Structure

```
ai-professor-review/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.js       # RAG chatbot endpoint
│   ├── page.js                # Chat interface
│   └── layout.js              # Root layout
├── public/
│   └── background.jpg         # UI assets
├── load.ipynb                 # Data loading notebook
├── reviews.json               # Professor reviews dataset
├── requirements.txt           # Python dependencies
├── package.json               # Node.js dependencies
└── .env.local                # API keys (not in repo)
```

## 🔧 Technical Highlights

### RAG Implementation
- **Embeddings**: Google's text-embedding-004 (768 dimensions)
- **Vector Search**: Cosine similarity with Pinecone
- **Retrieval**: Top-K relevant reviews based on semantic similarity
- **Generation**: Context-aware responses with retrieved data

### Performance Optimizations
- Serverless Pinecone deployment (AWS us-east-1)
- Response streaming for reduced latency
- Efficient embedding batching
- Optimized vector search queries

## 🔮 Future Enhancements

- Add professor comparison feature
- Implement filtering by department, rating, difficulty
- User authentication and saved searches
- Professor profile pages with detailed stats
- Integration with actual RateMyProfessor API
- Sentiment analysis on reviews
- Multi-university support
- Advanced analytics dashboard
- Mobile application

## 💡 Example Queries

- "Show me highly-rated Computer Science professors"
- "Find professors with easy grading in Mathematics"
- "Who are the best teachers for Physics?"
- "Recommend a professor for advanced algorithms"
- "Compare professors for Data Structures"

## 📚 Learning Outcomes

This project demonstrates:
- RAG (Retrieval-Augmented Generation) architecture
- Vector embeddings and semantic search
- Pinecone vector database usage
- Google Gemini AI integration
- Next.js 14 with App Router
- Data engineering and ETL pipelines
- Jupyter notebooks for data processing
- Production-grade AI application development

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `GEMINI_API_KEY`
   - `PINECONE_API_KEY`
4. Deploy!

### Pinecone Setup

1. Create account at [Pinecone](https://www.pinecone.io/)
2. Create new index:
   - Name: `rag`
   - Dimensions: `768`
   - Metric: `cosine`
   - Cloud: AWS
   - Region: us-east-1
3. Run `load.ipynb` to populate data

## 📝 License

This project is open source and available for educational purposes.

## 👤 Author

**Hardhik Tottempudi**
- GitHub: [@HardhikTottempudi](https://github.com/HardhikTottempudi)
- Portfolio: [hardhiktottempudi.com](https://hardhiktottempudi.com/)

---

*Built with Next.js, Google Gemini AI, and Pinecone to demonstrate advanced RAG architecture and semantic search capabilities.*
