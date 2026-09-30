import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const N8N_FORM_URL = 'https://geethasreemanchala.app.n8n.cloud/form/b94d695b-73dc-47af-88c4-f958dc1b359f';

// Use memory storage for uploaded resumes
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB max file size
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Workflow information endpoint
app.get('/api/workflow-info', (_req: Request, res: Response) => {
  res.json({
    name: 'resume analyzerr',
    url: N8N_FORM_URL,
    provider: 'n8n cloud',
    fields: [
      { id: 'field-0', name: 'name', type: 'text', label: 'Candidate Name', required: true },
      { id: 'field-1', name: 'email', type: 'email', label: 'Email Address', required: true },
      { id: 'field-2', name: 'Upload_Resume', type: 'file', label: 'Upload Resume', required: true, multiple: true },
    ],
    status: 'connected',
    verifiedAt: new Date().toISOString(),
  });
});

// Proxy submission to n8n form webhook
app.post('/api/submit-resume', upload.array('resumes', 5), async (req: Request, res: Response) => {
  try {
    const { name, email, targetRole, notes } = req.body;
    const files = req.files as Express.Multer.File[];

    if (!name || !name.trim()) {
      res.status(400).json({ error: 'Candidate name is required.' });
      return;
    }
    if (!email || !email.trim()) {
      res.status(400).json({ error: 'Email address is required.' });
      return;
    }
    if (!files || files.length === 0) {
      res.status(400).json({ error: 'At least one resume file must be uploaded.' });
      return;
    }

    // Build standard FormData to mirror the n8n form schema
    const n8nFormData = new FormData();
    n8nFormData.append('field-0', name.trim());
    n8nFormData.append('field-1', email.trim());

    // Append files as field-2 (Upload_Resume)
    for (const file of files) {
      const blob = new Blob([new Uint8Array(file.buffer)], { type: file.mimetype || 'application/octet-stream' });
      n8nFormData.append('field-2', blob, file.originalname);
    }

    // Optional metadata tags in case workflow uses query or multiselect
    if (targetRole) {
      n8nFormData.append('target_role', String(targetRole));
    }
    if (notes) {
      n8nFormData.append('notes', String(notes));
    }

    console.log(`[n8n Proxy] Forwarding submission for ${email} (${files.length} file(s)) to n8n form...`);

    const n8nResponse = await fetch(N8N_FORM_URL, {
      method: 'POST',
      body: n8nFormData,
      headers: {
        'User-Agent': 'Resume-Analyzer-Portal/1.0',
      },
    });

    const responseStatus = n8nResponse.status;
    const responseText = await n8nResponse.text();
    let responseJson: any = null;

    try {
      responseJson = JSON.parse(responseText);
    } catch {
      // plain text or HTML response
    }

    console.log(`[n8n Proxy] Received response with status ${responseStatus}`);

    // If n8n answered ok (200-299)
    if (n8nResponse.ok) {
      res.json({
        success: true,
        message: 'Resume successfully submitted to the n8n automation pipeline.',
        n8nStatus: responseStatus,
        details: responseJson || {
          confirmation: 'Your response has been recorded and the resume analyzer workflow has started.',
        },
        submittedAt: new Date().toISOString(),
      });
      return;
    }

    // If n8n returned error status
    res.status(responseStatus).json({
      success: false,
      error: 'n8n workflow rejected submission',
      status: responseStatus,
      raw: responseText.slice(0, 500),
    });
  } catch (err: any) {
    console.error('[n8n Proxy Error]', err);
    res.status(500).json({
      success: false,
      error: 'Failed to communicate with n8n workflow service.',
      details: err?.message || String(err),
    });
  }
});

// Setup Vite dev server or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Resume Analyzer App running on port ${PORT}`);
  });
}

startServer();
