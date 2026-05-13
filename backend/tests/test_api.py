from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_health_returns_success() -> None:
    response = client.get('/health')

    assert response.status_code == 200
    assert response.json() == {'status': 'ok'}


def test_analyze_accepts_uploaded_image_and_returns_expected_fields() -> None:
    files = {'file': ('scene.jpg', b'fake-image-bytes', 'image/jpeg')}

    response = client.post('/analyze', files=files)

    assert response.status_code == 200

    payload = response.json()
    expected_keys = {
        'risk_level',
        'hazard_type',
        'confidence',
        'analysis',
        'alerts',
        'actions',
        'report',
        'translations',
    }
    assert expected_keys.issubset(payload.keys())
